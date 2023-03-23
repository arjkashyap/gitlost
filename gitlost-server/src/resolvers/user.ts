import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { User } from "../entities/User";
import { LoginInput, RegisterInput } from "./LoginInput";
import argon2 from "argon2";
import { MyContext } from "src/types";
import { COOKIE_NAME } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister } from "../utils/inputValidators";
import { FieldError } from "./FieldError";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    console.log("Me query called: ");
    console.log(req.session);
    if (!req.session.userId) return null;
    const user = await User.findOne({ where: { id: req.session.userId } });
    return user;
  }

  @Query(() => [User])
  async users(@Arg("limit", () => Int) limit: number) {
    return await (await User.find()).slice(0, limit);
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string
    // @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email is not in the db
      return true;
    }

    // const token = v4();
    const token = "dummy-token";
    // await redis.set(
    //   FORGET_PASSWORD_PREFIX + token,
    //   user.id,
    //   "ex",
    //   1000 * 60 * 60 * 24 * 3
    // ); // 3 days

    await sendEmail(
      email,
      "Password reset",
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );

    return true;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log("Login called.");
    let user = null;
    if (options.usernameOrEmail?.includes("@")) {
      user = await User.findOne({ where: { email: options.usernameOrEmail } });
    } else
      user = await User.findOne({
        where: { username: options.usernameOrEmail },
      });

    if (!user) {
      return {
        errors: [{ field: "usernameOrEmail", message: "user does not exist" }],
      };
    }
    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [{ field: "password", message: "incorrect  password." }],
      };
    }

    // set userid in session storage
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log("register called");
    const errors = validateRegister(input);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(input.password);
    let queryResponse;
    try {
      let newUser = new User();
      newUser.username = input.username;
      newUser.email = input.email;
      newUser.password = hashedPassword;

      queryResponse = await newUser.save();
    } catch (err) {
      // perform some more validations here
      if (err.code === "23505" && err.detail?.includes("username")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }

      if (err.code === "23505" && err.detail?.includes("email")) {
        return {
          errors: [
            {
              field: "email",
              message: "email already registered",
            },
          ],
        };
      }
    }
    if (queryResponse) req.session.userId = queryResponse?.id;
    return { user: queryResponse };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    console.log("logout called");
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}

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
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import argon2 from "argon2";
import { MyContext } from "src/types";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

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
    if (!req.session.userId) return null;

    const user = await User.findOne({ where: { id: req.session.userId } });
    return user;
  }

  @Query(() => [User])
  async users(@Arg("limit", () => Int) limit: number) {
    return await (await User.find()).slice(0, limit);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });
    if (!user) {
      return {
        errors: [{ field: "username", message: "username does not exist" }],
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
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log("registerhit");
    const hashedPassword = await argon2.hash(input.password);
    let queryResponse;
    try {
      let newUser = new User();
      newUser.username = input.username;
      newUser.email = input.email;
      newUser.password = hashedPassword;

      queryResponse = await newUser.save();
    } catch (err) {
      console.log(err);
      // perform some more validations here
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }

      // password too short
      // email already exists

      if (queryResponse) req.session.userId = queryResponse?.id;
    }
    console.log(`${input.username} user signed up.`);
    return { user: queryResponse };
  }
}

import { Arg, Field, Int, Mutation, ObjectType, Query } from "type-graphql";
import { User } from "../entities/User";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import argon2 from "argon2";
import { userCompleteList } from "../tests/dummy/userList";

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
  @Query(() => [User])
  users(@Arg("limit", () => Int) limit: number) {
    console.log("query user hit");
    return userCompleteList.slice(0, limit);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UsernamePasswordInput
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
    }
    console.log(`${input.username} user signed up.`);
    return { user: queryResponse };
  }
}

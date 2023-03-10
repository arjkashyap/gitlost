import { Arg, Int, Query } from "type-graphql";
import { User } from "../entities/User";
import { userCompleteList } from "../tests/dummy/userList";

export class UserResolver {
  @Query(() => [User])
  users(@Arg("limit", () => Int) limit: number) {
    return userCompleteList.slice(0, limit);
  }
}

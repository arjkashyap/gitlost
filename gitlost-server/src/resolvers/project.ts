import { Project } from "../entities/Project";
import { Arg, Int, Query } from "type-graphql";

export class ProjectResolver {
  @Query(() => [Project])
  projects(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int) skip: number
  ) {}
}

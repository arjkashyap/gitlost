import { Project } from "../entities/Project";
import { Arg, Field, InputType, Mutation, Query } from "type-graphql";
import { AppDataSource } from "../data-source";

@InputType()
class ProjectInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  s3FileUrl: string;
}

export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    const repository = AppDataSource.getRepository(Project);
    const projects = await repository.find();
    return projects;
  }

  @Query(() => Project)
  async project(@Arg("id", () => String) id: string): Promise<Project | null> {
    const project = await Project.findOneBy({ id }).catch((err) => {
      throw err;
    });
    return project;
  }

  // requires auth middleware
  @Mutation(() => Project)
  async createProject(@Arg("input") input: ProjectInput): Promise<Project> {
    const project = await Project.create({
      ...input,
      orignalPosterId: "123213",
    })
      .save()
      .catch((err) => {
        throw err;
      });
    return project;
  }
}

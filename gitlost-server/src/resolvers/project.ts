import { Project } from "../entities/Project";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  UseMiddleware,
} from "type-graphql";
import { AppDataSource } from "../data-source";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { FieldError } from "./FieldError";

@InputType()
class ProjectInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  content: string;
}

@ObjectType()
class ProjectQueryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Project, { nullable: true })
  project?: Project;
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
  @Mutation(() => ProjectQueryResponse)
  @UseMiddleware(isAuth)
  async createProject(
    @Arg("input") input: ProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<Project> {
    const project = await Project.create({
      ...input,
      creatorId: req.session.userId,
    })
      .save()
      .catch((err) => {
        throw err;
      });
    return project;
  }

  // user can update only if its version 1
  // and there are no pull requests to the project
  @Mutation(() => ProjectQueryResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async updateProject(
    @Arg("id", () => String) id: string,
    @Arg("input") input: ProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<ProjectQueryResponse> {
    const project = await Project.findOne({
      where: { creatorId: req.session.userId, id: id },
    });
    // cannot update the project
    if (project) {
      if (project.currentVersion > 1) {
        return {
          errors: [
            {
              field: "master-validation",
              message:
                "creator cannot update the project if project version is not 1.0",
            },
          ],
        };
      }

      if (project.pullRequests?.length > 0) {
        return {
          errors: [
            {
              field: "master-validation",
              message:
                "creator cannot update project if pull requests have been made",
            },
          ],
        };
      }

      project.name = input.name ? input.name : project.name;
      project.description = input.description
        ? input.description
        : project.description;

      project.content = input.content ? input.content : project.content;

      await Project.save({
        ...project,
      });
      return { project };
    }

    return {
      errors: [
        {
          field: "master-validation",
          message: "no such project found in database",
        },
      ],
    };
  }
}

import { DataSource } from "typeorm";
import { Follow } from "./entities/Follow";
import { Project } from "./entities/Project";
import { PullRequest } from "./entities/PullRequest";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "gitlostdb",
  synchronize: true,
  logging: false,
  entities: [User, Project, PullRequest, Follow],
  migrations: [],
  subscribers: [],
});

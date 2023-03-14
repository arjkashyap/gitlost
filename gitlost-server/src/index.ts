import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ProjectResolver } from "./resolvers/project";
import { AppDataSource } from "./data-source";

const main = async () => {
  await AppDataSource.initialize().then(() =>
    console.log("db connection established")
  );

  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.log(err);
});

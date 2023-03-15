import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ProjectResolver } from "./resolvers/project";
import { AppDataSource } from "./data-source";
import { createClient } from "redis";
import session from "express-session";
import RedisStore from "connect-redis";
import { MyContext } from "./types";

const main = async () => {
  // ORM
  await AppDataSource.initialize().then(() =>
    console.log("db connection established")
  );

  // Express app
  const app = express();

  // Redis
  // Initialize client.
  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "gitlost:",
    disableTouch: true,
    disableTTL: true,
  });

  // Initialize sesssion storage.
  app.use(
    session({
      name: "qid",
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "5f1a95a5c25d86a375f15c5e",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: false, // cookie only works in https
      },
    })
  );

  // Database schmea
  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    validate: false,
  });

  //GraphQL Midleware
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({
      req,
      res,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Server
  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.log(err);
});

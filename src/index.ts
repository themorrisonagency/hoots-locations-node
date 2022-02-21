import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";

import 'dotenv-safe/config'
import cors from "cors";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";

import path from "path";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";

const session = require("express-session");

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User],
    migrations: [path.join(__dirname, "./migrations/*")]
  });
  // await Post.delete({})
  if (process.env.RUN_MIGRATIONS === "true") {
    await conn.runMigrations()
  }

  //   const post = orm.em.create(Post, { title: "My First post" });
  //   await orm.em.persistAndFlush(post);
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  
  /**
   * 
   * Add resolvers here then uncomment
   */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],// Use the old school apollo graphql playground
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(+process.env.PORT, () => {
    console.log("server started on ");
  });
};

main().catch((err) => {
  console.log(err);
});

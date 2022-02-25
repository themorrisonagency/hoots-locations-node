import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import bodyParser from 'body-parser'
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";

import 'dotenv-safe/config'
import cors from "cors";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";

import path from "path";
import {Location} from "./entities/Location"
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import { LocationResolver } from "./resolvers/location";
import CreateOrUpdateLocation from "./utils/CreateOrUpdateLocation";
const axios = require('axios')

const session = require("express-session");

const main = async () => {
  // Explicit config using .env file
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User, Location],
    migrations: [path.join(__dirname, "./migrations/*")]
  });

  // Alternative config will pick up ormconfig.json
  // const conn = await createConnection(await getConnectionOptions())
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
  app.use(bodyParser.json())


  app.put('/hooks/yext/:id', async (req, res) => {

    const url = `https://api.yext.com/v2/accounts/me/entities/${req.params.id}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`
    try {
      const result = await axios.put(url, req.body)
      await CreateOrUpdateLocation(result.data.response, req.params.id)
      res.json({status: 'success'})
    } catch(e){
      res.json(e)
    }

  })
  app.get('/hooks/yext/sync/:id', async (req, res) => {

    let entitySearch
    if (req.params.id == 'all'){
      entitySearch = `entities`
    } else {
      entitySearch = `entities/${req.params.id}`
    }

    const {data: yextLocation} = await axios.get(`https://api.yext.com/v2/accounts/me/${entitySearch}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`)

    const yextResponse = yextLocation.response

    if (req.params.id == 'all'){
      for (const entity of yextResponse.entities){
        await CreateOrUpdateLocation(entity, entity.meta.id)
      }
    } else {
      await CreateOrUpdateLocation(yextResponse, yextResponse.meta.id)
    }
    res.json(yextResponse)
    res.end()
    try {

    } catch(e){
      console.log('e',e)
    }
  
    
  })
  // app.get('/hooks/yext/:id', async (req, res, next) => {
  //   console.log('getting yexts', req.params.id)

  //   const locations = await Location.find()
  //   for (const loc of locations){
  //     const hourObj = {
  //       monOpen: loc.monOpen || "12:00AM",
  //       monClose: loc.monClose || "12:00AM",
  //       tueOpen: loc.tueOpen || "12:00AM",
  //       tueClose: loc.tueClose|| "12:00AM",
  //       wedOpen: loc.wedOpen || "12:00AM",
  //       wedClose: loc.wedClose|| "12:00AM",
  //       thuOpen: loc.thuOpen || "12:00AM",
  //       thuClose: loc.thuClose|| "12:00AM",
  //       friOpen: loc.friOpen || "12:00AM",
  //       friClose: loc.friClose|| "12:00AM",
  //       satOpen: loc.satOpen || "12:00AM",
  //       satClose: loc.satClose|| "12:00AM",
  //       sunOpen: loc.sunOpen || "12:00AM",
  //       sunClose: loc.sunClose|| "12:00AM",
  //     }
  //     loc.hours = await convertDbHoursToYext(hourObj)
  //   }

  //   res.send(locations)
  //   // const {data: location} = await axios.get(`https://api.yext.com/v2/accounts/me/entities/${req.params.id}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`)
  //   // res.send(location.response)

  //   // let updatedLocation;
  //   // try {
  //   //     const result = await getConnection()
  //   //     .createQueryBuilder()
  //   //     .insert()
  //   //     .into(Location)
  //   //     .values({
  //   //         ...options
  //   //     })
  //   //     .returning('*')
  //   //     .execute()
  //   //     updatedLocation = result.raw[0]
  //   // } catch (err) {
  //   //     return err
  //   // } 
  //   next()

  // })
  
  /**
   * 
   * Add resolvers here then uncomment
   */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, LocationResolver],
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

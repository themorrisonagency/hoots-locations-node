import "reflect-metadata";
import { __prod__ } from "./constants";
import express from "express";
import bodyParser from 'body-parser'
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import fs from 'fs'
import 'dotenv-safe/config'
import cors from "cors";

import { createConnection } from "typeorm";

import path from "path";
import {Location} from "./entities/Location"
import { LocationResolver } from "./resolvers/location";
const yext = require('./routes/yext')
const images = require('./routes/images')
const formidable = require('formidable');

const main = async () => {
  // Explicit config using .env file
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    entities: [Location],
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


  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(bodyParser.json())


  // A few routes for pulling from and pushing to yext.
  app.post('/images', (req, res) => {
    const form = new formidable.IncomingForm({keepExtensions:true});
    form.parse(req, async function (err, fields, files) {

      const filePath = await saveFile(files.file);
      return res.status(200).json({url: filePath});
    });
  });
  app.post('/hooks/yext', yext.create)
  app.put('/hooks/yext/:id', yext.update)
  app.delete('/hooks/yext/:id', yext.delete)
  app.get('/hooks/yext/sync/:id', yext.sync)
  const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${process.env.PERCH_UPLOAD_PATH}/${file.newFilename}`, data);
    await fs.unlinkSync(file.filepath);
    return `${process.env.PERCH_UPLOAD_PATH_PUBLIC}/${file.newFilename}`
  };
  
  /**
   * 
   * Add resolvers here then uncomment
   */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      nullableByDefault: true,//So we can return null fields cause not every field will have a value.
      resolvers: [LocationResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
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

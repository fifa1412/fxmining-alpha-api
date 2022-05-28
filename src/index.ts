import * as bodyParser from "body-parser";
import cors from "cors";
import express from 'express';

import routes from "./routes/index-routes";
import { initDatabaseConnection } from "./config/init-db"

initApp();

async function initApp() {
  const environment:String = process.env.npm_lifecycle_event!;
  process.env.TZ = "Asia/Bangkok";
  await initDatabaseConnection(environment);
  console.log(`Start Environment: ${environment}`);
  await initWebServer();
  
}

async function initWebServer() {
  const port = process.env.PORT || 3000;
  const app = express();

  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  app.use(cors());
  app.use(bodyParser.json({ limit: "10mb" }));

  app.use("/", routes.router);
  app.listen(port);

  console.log(`Express server has started on port ${port}`);
}


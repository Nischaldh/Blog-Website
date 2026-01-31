import "reflect-metadata";
import koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import logger from "./middleware/logger.js";

import apiRouter from "./router/api.router.js";
import errorHandler from "./middleware/errorHanlder.js";
import { AppDataSource } from "./config/type-orm.js";

const app = new koa();
const PORT = 3000;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));

app.use(bodyParser());

app.use(errorHandler);
app.use(logger);

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

try {
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`Server running in Port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}

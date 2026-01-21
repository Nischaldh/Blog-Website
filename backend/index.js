import koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from 'koa-router';
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import apiRouter from "./router/api.router.js";

const app = new koa();
const PORT = 3000;



app.use(cors())

app.use(bodyParser());


app.use(errorHandler)
app.use(logger)





app.use(async (ctx) => {
  ctx.body = "Hello World.";
});


app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());


app.listen(PORT, () => {
  console.log(`Server running in Port ${PORT}`);
});

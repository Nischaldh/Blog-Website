import koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import logger from "./middleware/logger.js";

import apiRouter from "./router/api.router.js";
import errorHandler from "./middleware/errorHanlder.js";


const app = new koa();
const PORT = 3000;


app.use(cors())

app.use(bodyParser());


app.use(errorHandler)
app.use(logger)




app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());


app.listen(PORT, () => {
  console.log(`Server running in Port ${PORT}`);
});

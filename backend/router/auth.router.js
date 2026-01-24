import Router from "koa-router";
import { login, signup } from "../controller/auth.controller.js";


const authRouter = new Router({prefix:"/auth"});



authRouter.post("/login",login);

authRouter.post("/signup", signup);


export default authRouter;
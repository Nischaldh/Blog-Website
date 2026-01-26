import Router from "koa-router";
import { getUser, updateProfile, updateProfilePic } from "../controller/user.controller.js";
import { uploadProfilePic } from "../middleware/uploadProfilePic.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getCommentsByUser } from "../controller/comment.controller.js";

const userRouter = new Router({prefix:'/users'});

userRouter.use(authMiddleware);
userRouter.get('/comments', getCommentsByUser);

userRouter.get("/:id",getUser);


userRouter.patch('/updateProfile',updateProfile);

userRouter.put("/updatePic",uploadProfilePic.single("image") ,updateProfilePic);


export default userRouter;
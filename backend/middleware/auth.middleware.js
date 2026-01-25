import { verifyToken } from "../lib/jwt.js";

export const authMiddleware = async (ctx, next)=>{
    const authHeader = ctx.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        ctx.throw(401,"Authentication required");
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if(!payload){
        ctx.throw(401, "Invalid token");
    }
    ctx.state.user = payload;
    await next();
}
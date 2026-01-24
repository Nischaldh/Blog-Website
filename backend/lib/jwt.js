import jwt from "jsonwebtoken";
import env from "./env.js";


export const generateToken = (user)=>{
    return jwt.sign({
        id:user.id,
        email:user.email,
        name:user.name,
    },
    env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
);
};

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}
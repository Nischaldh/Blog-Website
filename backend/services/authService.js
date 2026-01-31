import { AppDataSource } from "../config/type-orm.js";
import { comparePassword, hashPassword } from "../lib/bcypt.js";
import { checkUserByEmail, createUser } from "../lib/db.js";
import env from "../lib/env.js";
import { generateToken } from "../lib/jwt.js";
import { User } from "../models/User.entity.js";

const userRepository = AppDataSource.getRepository(User);

export const signUpServive = async (name, email, password) => {
  try {
    // first step check if user exists:
    // const userExists = await checkUserByEmail(email);
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      return {
        success: false,
        message: "User with email already exits.",
        code: 409,
      };
    }
    // encrpyt password
    const hashedPassword = await hashPassword(password);

    // create new user
    // const newUser = await createUser(name, email, hashedPassword);
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      image: env.DEFAULT_AVATAR,
    });
    await userRepository.save(newUser);

    const token = generateToken(newUser);
    delete newUser.password;

    return { success: true, user: newUser, token };
  } catch (error) {
    console.error("Signup Service Error:", error);
    return { success: false, message: "Internal server error", code: 500 };
  }
};

export const logInService = async (email, password) => {
  try {
    // using query and db
    // const user = await checkUserByEmail(email);

    // using type orm
    const user = await userRepository.findOne({where:{email}, select :["id","name","email","password","image"]});

    const hashedPassword = user ? user.password : env.DUMMY_HASH;

    const isMatch = await comparePassword(password, hashedPassword);
    if (!user || !isMatch) {
      return {
        success: false,
        code: 400,
        message: "Invalid Credentials",
      };
    }
    delete user.password;
    const token = generateToken(user);
    return { success: true, user, token };
  } catch (error) {
    console.error("Login Service Error:", error);
    return { success: false, message: "Internal server error", code: 500 };
  }
};

export const getMeService = async (id)=>{
  try {
    const user = await userRepository.findOne({where:{id}});
    if(!user){
      return{
        success:false,
        code:404,
        message:"User not found"
      };
    }
    return {success:true , user};
    
  } catch (error) {
    
  }
}
import { comparePassword, hashPassword } from "../lib/bcypt.js";
import { checkUserByEmail, createUser } from "../lib/db.js";
import env from "../lib/env.js";
import { generateToken } from "../lib/jwt.js";

export const signUpServive = async (name, email, password) => {
  try {
    // first step check if user exists:
    const userExists = await checkUserByEmail(email);
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
    const newUser = await createUser(name, email, hashedPassword);
    const token = generateToken(newUser);
    return { success: true, user: newUser, token };
  } catch (error) {
    console.error("Signup Service Error:", error);
    return { success: false, message: "Internal server error", code: 500 };
  }
};

export const logInService = async (email, password) => {
  try {
    const user = await checkUserByEmail(email);
    const hashedPassword = user
      ? user.password
      : env.DUMMY_HASH;

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
    return {success:true , user: user, token}
  } catch (error) {
    console.error("Login Service Error:", error);
    return { success: false, message: "Internal server error", code: 500 };
  }
};

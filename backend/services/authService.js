import { hashPassword } from "../lib/bcypt.js";
import { checkUserByEmail, createUser } from "../lib/db.js";
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
    const newUser = await createUser(name, email, hashedPassword );
    const token = generateToken(newUser);
    return { success: true, user: newUser , token};
  } catch (error) {
    console.error("Signup Service Error:", error);
    return { success: false, message: "Internal server error", code: 500 };
  }
};

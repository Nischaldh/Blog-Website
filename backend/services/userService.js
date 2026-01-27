import { AppDataSource } from "../config/type-orm.js";
import { comparePassword, hashPassword } from "../lib/bcypt.js";
import {
  getUserById,
  updateUserProfile,
  updateUserProfilePic,
} from "../lib/db.js";
import { User } from "../models/User.entity.js";

const userRepository = AppDataSource.getRepository(User);

export const getUserService = async (userId) => {
  try {
    // const user = await getUserById(userId);
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["id", "name", "email", "image", "created_at"],
    });

    if (!user) {
      return {
        success: false,
        code: 404,
        message: "User not found",
      };
    }
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Get User Service Error:", error);
    return {
      success: false,
      code: 500,
      message: "Internal server error",
    };
  }
};

export const updateProfileService = async (
  userId,
  name,
  email,
  currentPassword,
  newPassword,
) => {
  try {
    // const user = await getUserById(userId);
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["id", "name", "email", "password"],
    });

    if (!user) {
      return { success: false, message: "User not found", code: 404 };
    }
    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      return { success: false, message: "Invalid password", code: 401 };
    }
    // const updatedName = name || user.name;
    // const updatedEmail = email || user.email;

    // const updatedPassword = newPassword
    //   ? await hashPassword(newPassword)
    //   : user.password;
    // const updatedUser = await updateUserProfile(
    //   userId,
    //   updatedName,
    //   updatedEmail,
    //   updatedPassword,
    // );
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    if (newPassword) {
      user.password = await hashPassword(newPassword);
    }
    await userRepository.save(user);
    delete user.password;

    return { user, success: true };
  } catch (error) {
    console.error("Update Profile Service Error:", error);
    return {
      success: false,
      code: 500,
      message: "Internal server error",
    };
  }
};

export const updateProfilePicService = async (userId, file) => {
  try {
    if (!file) {
      return {
        success: false,
        code: 400,
        message: "Profile image is required",
      };
    }

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return { success: false, code: 404, message: "User not found" };
    }
    // const imageUrl = file.path;

    // const updatedUser = await updateUserProfilePic(userId, imageUrl);

    // if (!updatedUser) {
    //   return {
    //     success: false,
    //     code: 404,
    //     message: "User not found",
    //   };
    // }
    user.image = file.path;
    await userRepository.save(user);
    delete user.password;
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Update Profile Pic Service Error:", error);
    return {
      success: false,
      code: 500,
      message: "Internal server error",
    };
  }
};

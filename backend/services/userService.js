import { comparePassword, hashPassword } from "../lib/bcypt.js";
import {
  getUserById,
  updateUserProfile,
  updateUserProfilePic,
} from "../lib/db.js";

export const getUserService = async (userId) => {
  try {
    const user = await getUserById(userId);

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
    const user = await getUserById(userId);
    if (!user) {
      return { success: false, message: "User not found", code: 404 };
    }
    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      return { success: false, message: "Invalid password", code: 401 };
    }
    const updatedName = name || user.name;
    const updatedEmail = email || user.email;
    const updatedPassword = newPassword
      ? await hashPassword(newPassword)
      : user.password;
    const updatedUser = await updateUserProfile(
      userId,
      updatedName,
      updatedEmail,
      updatedPassword,
    );
    return { user: updatedUser, success: true };
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

    const imageUrl = file.path;
    const updatedUser = await updateUserProfilePic(userId, imageUrl);

    if (!updatedUser) {
      return {
        success: false,
        code: 404,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: updatedUser,
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

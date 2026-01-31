import api from "@/lib/api.js";

// Public APIs
export const getAllUsersService = async () => {
  try {
    const res = await api.get("/public/users");
    return res.data;
  } catch (error) {
    console.error("Get all users error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message 
    };
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const res = await api.get(`/public/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Get user by ID error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message 
    };
  }
};

// Authenticated APIs
export const getUserBlogsService = async () => {
  try {
    const res = await api.get("/users/blogs");
    return res.data;
  } catch (error) {
    console.error("Get user blogs error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message 
    };
  }
};

export const getUserCommentsService = async () => {
  try {
    const res = await api.get("/users/comments");
    return res.data;
  } catch (error) {
    console.error("Get user comments error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message 
    };
  }
};

export const updateProfileService = async (payload) => {
  try {
    const res = await api.patch("/users/updateProfile", payload);
    return res.data;
  } catch (error) {
    console.error("Update profile error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message 
    };
  }
};

export const updateProfilePicService = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await api.put("/users/updatePic", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Update profile pic error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || error.message 
    };
  }
};
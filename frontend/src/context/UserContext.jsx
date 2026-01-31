import {
  getAllUsersService,
  getUserByIdService,
  getUserBlogsService,
  getUserCommentsService,
  updateProfileService,
  updateProfilePicService,
} from "@/service/UserService";
import { createContext, useState } from "react";
import { useToast } from "./ToastContext";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Get all users
  const fetchAllUsers = async () => {
    setLoading(true);
    const res = await getAllUsersService();
    if (res.success) {
      setUsers(res.users);
    } else {
      toast.error(res.message || "Failed to load users.");
    }
    setLoading(false);
    return res;
  };

  // Get user by ID
  const fetchUserById = async (id) => {
    const res = await getUserByIdService(id);
    if (!res.success) {
      toast.error(res.message || "Failed to load user profile.");
    }
    return res;
  };

  // Get current user's blogs
  const fetchUserBlogs = async () => {
    setLoading(true);
    const res = await getUserBlogsService();
    setLoading(false);
    if (!res.success) {
      toast.error(res.message || "Failed to load your blogs.");
    }
    return res;
  };

  // Get current user's comments
  const fetchUserComments = async () => {
    setLoading(true);
    const res = await getUserCommentsService();
    setLoading(false);
    if (!res.success) {
      toast.error(res.message || "Failed to load your comments.");
    }
    return res;
  };

  // Update user profile
  const updateProfile = async (payload) => {
    const res = await updateProfileService(payload);
    if (res.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(res.message || "Failed to update profile.");
    }
    return res;
  };

  // Update profile picture
  const updateProfilePic = async (file) => {
    const res = await updateProfilePicService(file);
    if (res.success) {
      toast.success("Profile picture updated successfully!");
    } else {
      toast.error(res.message || "Failed to update profile picture.");
    }
    return res;
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        fetchAllUsers,
        fetchUserById,
        fetchUserBlogs,
        fetchUserComments,
        updateProfile,
        updateProfilePic,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
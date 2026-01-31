import { useState, useEffect } from "react";
import { useUser } from "./useContexts";
import { useAuth } from "./useAuth";

export const useSettings = () => {
  const { updateProfile, updateProfilePic } = useUser();
  const { user, updateUser } = useAuth();


  const [profilePic, setProfilePic] = useState(user?.image || "");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isUploadingPic, setIsUploadingPic] = useState(false);


  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfilePic(user.image || "");
      setUserInfo({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

 
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePicPreview(e.target.result);
      reader.readAsDataURL(file);
      setNewProfilePic(file);
      setErrors({ ...errors, profilePic: "" });
    } else {
      setErrors({ ...errors, profilePic: "Please upload a valid image file" });
    }
  };

  const handleProfilePicSubmit = async (e) => {
    e.preventDefault();
    if (!newProfilePic) {
      setErrors({ ...errors, profilePic: "Please select an image first" });
      return;
    }
    setIsUploadingPic(true);
    const result = await updateProfilePic(newProfilePic);
    setIsUploadingPic(false);
    if (result.success) {
      updateUser(result.user);
      setProfilePic(result.user.image);
      setNewProfilePic(null);
      setProfilePicPreview(null);
    }
  };

  const handleCancelProfilePic = () => {
    setNewProfilePic(null);
    setProfilePicPreview(null);
    setErrors({ ...errors, profilePic: "" });
  };

  
  const validateUserInfo = () => {
    const newErrors = {};
    if (!userInfo.name.trim()) newErrors.name = "Name is required";
    if (!userInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userInfo.email))
      newErrors.email = "Please enter a valid email";


    if (!userInfo.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required to make changes";
    }

    // Validate new password only if user is trying to change it
    if (userInfo.newPassword || userInfo.confirmPassword) {
      if (!userInfo.newPassword)
        newErrors.newPassword = "Please enter new password";
      else if (userInfo.newPassword.length < 6)
        newErrors.newPassword = "Password must be at least 6 characters";
      if (userInfo.newPassword !== userInfo.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    if (!validateUserInfo()) return;

    const payload = { 
      name: userInfo.name, 
      email: userInfo.email,
      currentPassword: userInfo.currentPassword
    };
    
  
    if (userInfo.newPassword && userInfo.newPassword.trim()) {
      payload.newPassword = userInfo.newPassword;
    }

    const result = await updateProfile(payload);
    if (result.success) {
      updateUser(result.user);
      setUserInfo({
        ...userInfo,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return {
    // Profile Picture
    profilePic,
    newProfilePic,
    profilePicPreview,
    isUploadingPic,
    handleProfilePicChange,
    handleProfilePicSubmit,
    handleCancelProfilePic,

    // User Info
    userInfo,
    setUserInfo,
    handleUserInfoSubmit,

    // Errors
    errors,
  };
};
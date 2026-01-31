import { useState } from "react";
import { Camera } from "lucide-react";

const Settings = () => {
  // Profile Picture State
  const [profilePic, setProfilePic] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  );
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  // User Information State
  const [userInfo, setUserInfo] = useState({
    name: "Nischal Dhungana",
    email: "nischal@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Profile Picture Upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePicPreview(e.target.result);
          setNewProfilePic(file);
        };
        reader.readAsDataURL(file);
        setErrors({ ...errors, profilePic: "" });
      } else {
        setErrors({ ...errors, profilePic: "Please upload a valid image file" });
      }
    }
  };

  const handleProfilePicSubmit = (e) => {
    e.preventDefault();
    if (!newProfilePic) {
      setErrors({ ...errors, profilePic: "Please select an image first" });
      return;
    }
    // Here you would upload to server
    setProfilePic(profilePicPreview);
    setNewProfilePic(null);
    setProfilePicPreview(null);
    alert("Profile picture updated successfully!");
  };

  const handleCancelProfilePic = () => {
    setNewProfilePic(null);
    setProfilePicPreview(null);
    setErrors({ ...errors, profilePic: "" });
  };

  // Handle User Information Update
  const validateUserInfo = () => {
    const newErrors = {};

    if (!userInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (userInfo.newPassword) {
      if (!userInfo.currentPassword) {
        newErrors.currentPassword = "Current password is required to change password";
      }
      if (userInfo.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }
      if (userInfo.newPassword !== userInfo.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (validateUserInfo()) {
      // Here you would send update to server
      console.log("User info updated:", userInfo);
      alert("User information updated successfully!");
      // Clear password fields
      setUserInfo({
        ...userInfo,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Profile Picture Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Profile Picture</h2>
        
        <form onSubmit={handleProfilePicSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {/* Profile Picture Display */}
            <div className="relative group">
              <img
                src={profilePicPreview || profilePic}
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="profilePicInput"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <Camera className="text-white" size={32} />
              </label>
              <input
                type="file"
                id="profilePicInput"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>

            <p className="text-sm text-gray-600 text-center">
              Click on the image to upload a new profile picture
            </p>

            {errors.profilePic && (
              <p className="text-red-500 text-sm">{errors.profilePic}</p>
            )}

            {/* Show buttons only when a new image is selected */}
            {newProfilePic && (
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Upload Picture
                </button>
                <button
                  type="button"
                  onClick={handleCancelProfilePic}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* User Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">User Information</h2>

        <form onSubmit={handleUserInfoSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <p className="text-sm text-gray-600 mb-4">
              Leave blank if you don't want to change your password
            </p>

            {/* Current Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={userInfo.currentPassword}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, currentPassword: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter current password"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={userInfo.newPassword}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, newPassword: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
import { Camera } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const Settings = () => {
  const {
    profilePic,
    newProfilePic,
    profilePicPreview,
    isUploadingPic,
    handleProfilePicChange,
    handleProfilePicSubmit,
    handleCancelProfilePic,
    userInfo,
    setUserInfo,
    handleUserInfoSubmit,
    errors,
  } = useSettings();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Profile Picture */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Profile Picture</h2>
        <form onSubmit={handleProfilePicSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={profilePicPreview || profilePic || "https://via.placeholder.com/160"}
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
                disabled={isUploadingPic}
              />
            </div>
            {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic}</p>}

            {newProfilePic && (
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isUploadingPic}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingPic ? "Uploading..." : "Upload Picture"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelProfilePic}
                  disabled={isUploadingPic}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* User Info */}
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
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Change Password (Optional)</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Current Password <span className="text-red-500">*</span>
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
                placeholder="Enter current password (required for any changes)"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Current password is required to make any profile changes
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={userInfo.newPassword}
                onChange={(e) => setUserInfo({ ...userInfo, newPassword: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

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
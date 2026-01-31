import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/nav/NavBar";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import UploadBlog from "./pages/UploadBlog";
import EditBlog from "./pages/EditBlog";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <main className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div>
        <NavBar className="fixed top-0 left-0" />
      </div>
      
      <div className="py-30 flex flex-col items-center justify-center">
        <Routes>
          {/* Public Routes - Anyone can access */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />

          {/* Auth Routes - Redirect to home if already logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes - Only authenticated users can access */}
          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/upload"
            element={
              <ProtectedRoute>
                <UploadBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/edit/id/:id" 
            element={
            <ProtectedRoute>
            <EditBlog />
           </ProtectedRoute>
          }
          />
          <Route
            path="/blog/edit/:slug"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

    
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default App;
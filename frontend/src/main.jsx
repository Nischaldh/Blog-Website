import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";
import { CommentProvider } from "./context/CommentContext";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <BlogProvider>
              <CommentProvider>
                <App />
              </CommentProvider>
            </BlogProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </StrictMode>
    ,
  </BrowserRouter>,
);

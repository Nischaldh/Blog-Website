import BlogForm from "@/components/forms/BlogForm";
import { useNavigate } from "react-router-dom";

const UploadBlog = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
    // Handle form submission here (e.g., send to API)
    alert("Blog uploaded successfully!");
    // navigate("/blogs"); // Navigate to blogs list after successful upload
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <BlogForm
      isEditMode={false}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default UploadBlog;
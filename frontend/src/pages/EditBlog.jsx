import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BlogForm from "@/components/forms/BlogForm";
import datas from "@/constants/data";


const EditBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = datas.find((item) => item.slug === slug);

  const initialData = blog ? {
    title: blog.title || "",
    content: blog.content || "",
    tags: blog.tags || [],
    primary_image: blog.primary_image || null,
    secondary_image1: blog.secondary_image1 || null,
    secondary_image2: blog.secondary_image2 || null,
  } : null;

  useEffect(() => {
    if (!blog) {
      navigate("/"); // Redirect if blog not found
    }
  }, [slug, navigate, blog]);

  const handleSubmit = (formData) => {
    console.log("Blog updated:", formData);
    // Handle form submission here (e.g., send to API)
    alert("Blog updated successfully!");
    navigate(`/blog/${slug}`); // Navigate back to blog page
  };

  const handleCancel = () => {
    navigate(`/blog/${slug}`); // Navigate back to blog page
  };

  // Show loading state while data is being fetched
  if (!initialData) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <p className="text-gray-500">Loading blog data...</p>
      </div>
    );
  }

  return (
    <BlogForm
      initialData={initialData}
      isEditMode={true}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default EditBlog;
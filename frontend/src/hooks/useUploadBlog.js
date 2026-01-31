import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBlog } from "./useContexts";

export const useUploadBlog = () => {
  const navigate = useNavigate();
  const { addBlog, updateBlog } = useBlog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const convertImageToFile = async (imageData, fieldName) => {
    if (imageData instanceof File) {
      return imageData;
    }
    
    if (typeof imageData === "string" && imageData.startsWith("data:")) {
      const blob = await fetch(imageData).then((r) => r.blob());
      return new File([blob], `${fieldName}.jpg`, { type: blob.type });
    }
    
    return null;
  };

  const prepareBlogData = async (formData, status = "DRAFT") => {
    const blogData = new FormData();

    blogData.append("title", formData.title || "Untitled");
    blogData.append("content", formData.content || "");
    blogData.append("status", status);
    
    
    if (formData.tags && formData.tags.length > 0) {
      blogData.append("tags", formData.tags.join(","));
    } else if (status === "DRAFT") {
      blogData.append("tags", "draft");
    }

    // Add images
    if (formData.primary_image) {
      const file = await convertImageToFile(formData.primary_image, "primaryImage");
      if (file) {
        blogData.append("primaryImage", file);
      }
    }

    if (formData.secondary_image1) {
      const file = await convertImageToFile(formData.secondary_image1, "secondaryImage1");
      if (file) {
        blogData.append("secondaryImage1", file);
      }
    }

    if (formData.secondary_image2) {
      const file = await convertImageToFile(formData.secondary_image2, "secondaryImage2");
      if (file) {
        blogData.append("secondaryImage2", file);
      }
    }

    return blogData;
  };

  const handleSaveDraft = async (formData) => {
    try {
      const blogData = await prepareBlogData(formData, "DRAFT");
      
      let result;
      if (draftId) {
        result = await updateBlog(draftId, blogData);
      } else {
        result = await addBlog(blogData);
        if (result.success && result.blog?.id) {
          setDraftId(result.blog.id);
        }
      }

      return result;
    } catch (error) {
      console.error("Save draft error:", error);
      throw error;
    }
  };

  const handleSubmit = async (formData) => {
    if (isSubmitting) return false;
    setIsSubmitting(true);
    
    try {
      const blogData = await prepareBlogData(formData, "PUBLISHED");
      
      let result;
      if (draftId) {
        
        result = await updateBlog(draftId, blogData);
      } else {
      
        result = await addBlog(blogData);
      }

      if (result.success) {
        navigate(`/blog/${result.blog.slug}`);
      }
    } catch (error) {
      console.error("Upload blog error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    handleSubmit,
    handleSaveDraft,
    handleCancel,
    draftId,
  };
};
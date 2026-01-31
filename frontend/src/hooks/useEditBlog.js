import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "./useContexts";

export const useEditBlog = () => {
  const { id, slug } = useParams(); // Get both params
  const navigate = useNavigate();
  const { fetchBlogBySlug, fetchBlogById, updateBlog } = useBlog();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
   
      setLoading(true);

      let result;
      if (id) {
       
        result = await fetchBlogById(id);
      } else if (slug) {
        
        result = await fetchBlogBySlug(slug);
      } else {
       
        navigate("/");
        return;
      }

      if (result?.success) {
        
        setBlog(result.blog);
        setInitialData({
          title: result.blog.title || "",
          content: result.blog.content || "",
          tags: result.blog.tags?.map((tag) => tag.name) || [],
          primary_image: result.blog.primary_image || null,
          secondary_image1: result.blog.secondary_image_1 || null,
          secondary_image2: result.blog.secondary_image_2 || null,
        });
      } else {
        
        navigate("/");
      }

      setLoading(false);
    };

    loadBlog();
  }, [id, slug, fetchBlogById, fetchBlogBySlug, navigate]);

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

  const prepareBlogData = async (formData, status) => {
    const blogData = new FormData();

    blogData.append("title", formData.title);
    blogData.append("content", formData.content);
    blogData.append("status", status);

    if (formData.tags && formData.tags.length > 0) {
      blogData.append("tags", formData.tags.join(","));
    }

    if (
      formData.primary_image &&
      formData.primary_image !== initialData?.primary_image
    ) {
      const file = await convertImageToFile(
        formData.primary_image,
        "primaryImage",
      );
      if (file) {
        blogData.append("primaryImage", file);
      }
    }

    if (formData.secondary_image1 !== initialData?.secondary_image1) {
      if (formData.secondary_image1) {
        const file = await convertImageToFile(
          formData.secondary_image1,
          "secondaryImage1",
        );
        if (file) {
          blogData.append("secondaryImage1", file);
        }
      } else {
        blogData.append("secondaryImage1", "");
      }
    }

    if (formData.secondary_image2 !== initialData?.secondary_image2) {
      if (formData.secondary_image2) {
        const file = await convertImageToFile(
          formData.secondary_image2,
          "secondaryImage2",
        );
        if (file) {
          blogData.append("secondaryImage2", file);
        }
      } else {
        blogData.append("secondaryImage2", "");
      }
    }

    return blogData;
  };

  const handleSaveDraft = async (formData) => {
    if (!blog) return;

    try {
      const blogData = await prepareBlogData(formData, "DRAFT");
      const result = await updateBlog(blog.id, blogData);
      return result;
    } catch (error) {
      console.error("Save draft error:", error);
      throw error;
    }
  };

  const handleSubmit = async (formData) => {
    if (!blog) return;

    try {
      const blogData = await prepareBlogData(formData, "PUBLISHED");
      const result = await updateBlog(blog.id, blogData);

      if (result.success) {
        navigate(`/blog/${result.blog.slug}`);
      }
    } catch (error) {
      console.error("Edit blog error:", error);
    }
  };

  const handleCancel = () => {
  
    if (id) {
    
      navigate("/myprofile");
    } else if (slug) {
    
      navigate(`/blog/${slug}`);
    } else {
      navigate("/");
    }
  };

  return {
    blog,
    loading,
    initialData,
    handleSubmit,
    handleSaveDraft,
    handleCancel,
  };
};

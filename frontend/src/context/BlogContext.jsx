import {
  createBlogService,
  deleteBlogService,
  editBlogService,
  getAllBlogsService,
  getAllCommentsForBlogService,
  getBlogByIdService,
  getBlogBySlugService,
  getBlogsFromTagsService,
} from "@/service/BlogService";
import { createContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

// eslint-disable-next-line react-refresh/only-export-components
export const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // fetch all public blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const res = await getAllBlogsService();
      if (res.success) {
        setBlogs(res.blogs);
      } else {
        toast.error(res.message || "Failed to load blogs.");
      }
      setLoading(false);
    };
    fetchBlogs();
  }, [toast]);

  const refreshBlogs = async () => {
    const res = await getAllBlogsService();
    if (res.success) {
      setBlogs(res.blogs);
    } else {
      toast.error(res.message || "Failed to refresh blogs.");
    }
  };

  const addBlog = async (formData) => {
    const res = await createBlogService(formData);
    if (res.success) {
      setBlogs((prev) => [res.blog, ...prev]);
      toast.success("Blog created successfully!");
    } else {
      toast.error(res.message || "Failed to create blog.");
    }
    return res;
  };

  const updateBlog = async (id, formData) => {
    const res = await editBlogService(id, formData);
    if (res.success) {
      setBlogs((prev) => prev.map((b) => (b.id === id ? res.blog : b)));
      toast.success("Blog updated successfully!");
    } else {
      toast.error(res.message || "Failed to update blog.");
    }
    return res;
  };

  const removeBlog = async (id) => {
    const res = await deleteBlogService(id);
    if (res.success) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully!");
    } else {
      toast.error(res.message || "Failed to delete blog.");
    }
    return res;
  };

  const filterBlogsByTags = async (tags) => {
    const res = await getBlogsFromTagsService(tags);
    if (res.success) {
      setBlogs(res.blogs);
    } else {
      toast.error(res.message || "Failed to filter blogs by tags.");
    }
    return res;
  };

  const fetchBlogBySlug = async (slug) => {
    const res = await getBlogBySlugService(slug);
    if (!res.success) {
      toast.error(res.message || "Failed to load blog.");
    }
    return res;
  };

  const fetchBlogById = async (id) => {
    const res = await getBlogByIdService(id);
    if (!res.success) {
      toast.error(res.message || "Failed to load blog.");
    }
    return res;
  };

  const fetchCommentsForBlog = async (blogId) => {
    const res = await getAllCommentsForBlogService(blogId);
    if (!res.success) {
      toast.error(res.message || "Failed to load comments.");
    }
    return res;
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        refreshBlogs,
        addBlog,
        updateBlog,
        removeBlog,
        filterBlogsByTags,
        fetchBlogBySlug,
        fetchBlogById,
        fetchCommentsForBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
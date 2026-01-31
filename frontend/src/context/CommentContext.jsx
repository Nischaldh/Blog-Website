import {
  deleteCommentService,
  editCommentService,
  getAllCommentsService,
  getCommentsByUserService,
  getCommentsForBlogService,
  postCommentService,
} from "@/service/CommentService";
import { createContext, useState, useCallback } from "react";
import { useToast } from "./ToastContext";

// eslint-disable-next-line react-refresh/only-export-components
export const CommentContext = createContext(null);

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Fetch all public comments
  const fetchAllComments = useCallback(async () => {
    setLoading(true);
    const res = await getAllCommentsService();
    if (res.success) {
      setComments(res.comments);
     
    } else {
      toast.error(res.message || "Failed to load comments.");
    }
    setLoading(false);
    return res;
  }, [toast]);

  // Fetch comments for a specific blog
  const fetchCommentsForBlog = useCallback(async (blogId) => {
    setLoading(true);
    const res = await getCommentsForBlogService(blogId);
    if (res.success) {
      setComments(res.comments);
     
    } else {
      toast.error(res.message || "Failed to load comments for this blog.");
    }
    setLoading(false);
    return res;
  }, [toast]);

  // Fetch comments for the logged-in user
  const fetchCommentsByUser = useCallback(async () => {
    setLoading(true);
    const res = await getCommentsByUserService();
    if (res.success) {
      setComments(res.comments);
      
    } else {
      toast.error(res.message || "Failed to load your comments.");
    }
    setLoading(false);
    return res;
  }, [toast]);

  // Add a comment
  const postComment = useCallback(async (blogId, content) => {
    const res = await postCommentService(blogId, content);
    if (res.success) {
      setComments((prev) => [...prev, res.comment]);
      toast.success("Comment posted successfully!");
    } else {
      toast.error(res.message || "Failed to post comment.");
    }
    return res;
  }, [toast]);

  // Edit a comment
  const editComment = useCallback(async (id, content) => {
    const res = await editCommentService(id, content);
    if (res.success) {
      setComments((prev) => prev.map((c) => (c.id === id ? res.comment : c)));
      toast.success("Comment updated successfully!");
    } else {
      toast.error(res.message || "Failed to update comment.");
    }
    return res;
  }, [toast]);

  // Delete a comment
  const deleteComment = useCallback(async (id) => {
    const res = await deleteCommentService(id);
    if (res.success) {
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("Comment deleted successfully!");
    } else {
      toast.error(res.message || "Failed to delete comment.");
    }
    return res;
  }, [toast]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchAllComments,
        fetchCommentsForBlog,
        fetchCommentsByUser,
        postComment,
        editComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
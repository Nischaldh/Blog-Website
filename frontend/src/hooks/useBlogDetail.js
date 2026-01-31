import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog, useComment } from "./useContexts";
import { useAuth } from "./useAuth";

export const useBlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { fetchBlogBySlug, removeBlog } = useBlog();
  const { fetchCommentsForBlog, postComment, editComment, deleteComment } = useComment();
  const { user, isAuthenticated } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  useEffect(() => {
    const loadBlogData = async () => {
      setLoading(true);
      const blogResult = await fetchBlogBySlug(slug);
      
      if (blogResult.success) {
        setBlog(blogResult.blog);
        
        // Load comments for this blog
        setCommentsLoading(true);
        const commentsResult = await fetchCommentsForBlog(blogResult.blog.id);
        if (commentsResult.success) {
          setComments(commentsResult.comments || []);
        }
        setCommentsLoading(false);
      } else {
        navigate("/"); // Redirect if blog not found
      }
      
      setLoading(false);
    };

    loadBlogData();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle delete blog
  const handleDeleteBlog = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const result = await removeBlog(blog.id);
      if (result.success) {
        navigate("/");
      }
    }
  };

  
  // Handle edit blog
  const handleEditBlog = () => {
    navigate(`/blog/edit/${slug}`);
  };

  // Handle post new comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const result = await postComment(blog.id, newComment.trim());
    if (result.success) {
      const commentWithUser = {
        ...result.comment,
        user: result.comment.user || {
          id: user.id,
          name: user.name,
          image: user.image,
        }
      };
      setComments([...comments, commentWithUser]);
      setNewComment("");
    }
  };

  // Handle start editing comment
  const handleStartEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  // Handle save edited comment
  const handleSaveEditComment = async (commentId) => {
    if (!editingCommentContent.trim()) return;

    const result = await editComment(commentId, editingCommentContent.trim());
    if (result.success) {
      
      const updatedComment = {
        ...result.comment,
        user: result.comment.user || comments.find(c => c.id === commentId)?.user
      };
      setComments(comments.map(c => c.id === commentId ? updatedComment : c));
      setEditingCommentId(null);
      setEditingCommentContent("");
    }
  };

  // Handle cancel editing
  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const result = await deleteComment(commentId);
      if (result.success) {
        setComments(comments.filter(c => c.id !== commentId));
      }
    }
  };

  const isAuthor = user && blog && user.id === blog.author?.id;

  return {
    blog,
    comments,
    loading,
    commentsLoading,
    isAuthor,
    isAuthenticated,
    user,
    
    // Blog actions
    handleDeleteBlog,
    handleEditBlog,
    
    // Comment actions
    newComment,
    setNewComment,
    handlePostComment,
    
    // Edit comment
    editingCommentId,
    editingCommentContent,
    setEditingCommentContent,
    handleStartEditComment,
    handleSaveEditComment,
    handleCancelEditComment,
    
    // Delete comment
    handleDeleteComment,
  };
};
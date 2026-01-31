import { useState, useEffect } from "react";
import { useComment } from "@/hooks/useContexts";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import CommentCard from "./cards/CommentCard";

const Comments = ({ blogId }) => {
  const { comments, fetchCommentsForBlog, postComment } = useComment();
  const { user, isAuthenticated } = useAuth();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blogId) {
      fetchCommentsForBlog(blogId);
    }
  }, [blogId, fetchCommentsForBlog]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    if (!isAuthenticated) {
      alert("Please login to comment");
      return;
    }

    setIsSubmitting(true);
    await postComment(blogId, text);
    setText("");
    setIsSubmitting(false);
  };

  return (
    <div className="mt-12 w-full max-w-3xl">
      <h4 className="font-bold text-lg mb-4">
        Comments ({comments.length})
      </h4>

      {/* Write comment */}
      {isAuthenticated ? (
        <div className="flex gap-3 mb-6">
          <img
            src={user?.image}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              disabled={isSubmitting}
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !text.trim()}
              className="mt-2 px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-2">Please login to comment</p>
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </div>
      )}

      {/* Render comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
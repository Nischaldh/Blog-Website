import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useComment } from "@/hooks/useContexts";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const CommentCard = ({ comment }) => {
  const { editComment, deleteComment } = useComment();
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentUser = comment.user || {};
  const isOwner = isAuthenticated && user?.id === (comment.userId || commentUser.id);

  const handleSave = async () => {
    if (!editedContent.trim()) return;
    setIsSubmitting(true);
    const result = await editComment(comment.id, editedContent);
    setIsSubmitting(false);
    if (result.success) setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(comment.id);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex gap-3">
        <Link to={`/profile/${comment.userId || commentUser.id}`}>
          <img
            src={commentUser.image}
            alt={commentUser.name || comment.name}
            className="w-10 h-10 rounded-full object-cover hover:ring-2 ring-blue-500 transition"
          />
        </Link>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <Link
              to={`/profile/${comment.userId || commentUser.id}`}
              className="font-semibold text-sm hover:text-blue-600 transition"
            >
              {commentUser.name || comment.name}
            </Link>

            {isOwner && !isEditing && (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 p-1">
                  <Pencil size={14} />
                </button>
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-2">
            {new Date(comment.created_at || comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={isSubmitting}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  disabled={isSubmitting || !editedContent.trim()}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
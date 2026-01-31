import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useComment } from "@/hooks/useContexts";
import { Link } from "react-router-dom";

const MyComments = ({ comments: initialComments }) => {
  const { editComment, deleteComment } = useComment();
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditedContent(comment.content);
  };

  const handleSaveComment = async (commentId) => {
    if (!editedContent.trim()) return;

    setIsSubmitting(true);
    const result = await editComment(commentId, editedContent);
    setIsSubmitting(false);

    if (result.success) {
      setEditingComment(null);
      setEditedContent("");
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditedContent("");
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(commentId);
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="space-y-4">
        {initialComments.length > 0 ? (
          initialComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <Link
                    to={`/blog/${comment.blogSlug || comment.blog?.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {comment.blogTitle || comment.blog?.title || "Blog Post"}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.created_at || comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit comment"
                    disabled={editingComment === comment.id}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete comment"
                    disabled={isSubmitting}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingComment === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    disabled={isSubmitting}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveComment(comment.id)}
                      disabled={isSubmitting || !editedContent.trim()}
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                      className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mt-2">{comment.content}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">
            You haven't posted any comments yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyComments;
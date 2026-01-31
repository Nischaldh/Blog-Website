import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const MyComments = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditedContent(comment.content);
  };

  const handleSaveComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: editedContent }
          : comment
      )
    );
    setEditingComment(null);
    setEditedContent("");
    alert("Comment updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditedContent("");
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
      alert("Comment deleted successfully!");
    }
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-semibold mb-4">My Comments</h2>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <a
                    href={`/blog/${comment.blogSlug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {comment.blogTitle}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit comment"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete comment"
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
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveComment(comment.id)}
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
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
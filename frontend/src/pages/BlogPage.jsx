import { Link } from "react-router-dom";
import { useBlogDetail } from "@/hooks/useBlogDetail";

const BlogPage = () => {
  const {
    blog,
    comments,
    loading,
    commentsLoading,
    isAuthor,
    isAuthenticated,
    user,
    handleDeleteBlog,
    handleEditBlog,
    newComment,
    setNewComment,
    handlePostComment,
    editingCommentId,
    editingCommentContent,
    setEditingCommentContent,
    handleStartEditComment,
    handleSaveEditComment,
    handleCancelEditComment,
    handleDeleteComment,
  } = useBlogDetail();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog not found </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={blog.author?.image || "https://via.placeholder.com/40"}
            alt={blog.author?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/profile/${blog.author?.id}`}
              className="font-semibold hover:text-blue-600"
            >
              {blog.author?.name}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {typeof tag === "string" ? tag : tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Author Actions */}
        {isAuthor && (
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleEditBlog}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Blog
            </button>
            <button
              onClick={handleDeleteBlog}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete Blog
            </button>
          </div>
        )}
      </div>
      {blog.primary_image && (
        <div className="w-full aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={blog.primary_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg leading-relaxed whitespace-pre-wrap">{blog.content}</p>
      </div>

      
      {(blog.secondary_image_1 || blog.secondary_image_2) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {blog.secondary_image_1 && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={blog.secondary_image_1}
                alt="Secondary 1"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {blog.secondary_image_2 && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={blog.secondary_image_2}
                alt="Secondary 2"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Comments Section */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handlePostComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-600 mb-2">Please log in to comment</p>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        )}

        {/* Comments List */}
        {commentsLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.user?.image || "https://via.placeholder.com/40"}
                      alt={comment.user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.user?.name}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {editingCommentId === comment.id ? (
                        <div>
                          <textarea
                            value={editingCommentContent}
                            onChange={(e) => setEditingCommentContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleSaveEditComment(comment.id)}
                              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEditComment}
                              className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700">{comment.content}</p>
                          {user?.id === comment.user?.id && (
                            <div className="flex gap-3 mt-2">
                              <button
                                onClick={() => handleStartEditComment(comment)}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-sm text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
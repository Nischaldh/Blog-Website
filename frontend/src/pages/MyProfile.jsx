import BlogCard from "@/components/cards/BlogCard";
import MyComments from "@/components/MyComments";
import { Link } from "react-router-dom";
import { useMyProfile } from "@/hooks/useMyProfile";

const MyProfile = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    publishedBlogs,
    draftBlogs,
    comments,
    loading,
  } = useMyProfile();

  return (
    <div className="flex flex-col items-center m-auto gap-5 p-5 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.image}
          alt={user?.name}
          className="h-52 w-52 rounded-full object-cover border-4 border-gray-200"
        />
        <h1 className="text-3xl font-bold">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>

        {user?.bio && (
          <p className="text-gray-600 text-center max-w-2xl">{user.bio}</p>
        )}

        <Link
          to="/settings"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link>
      </div>

      {/* Tabs */}
      <div className="w-full mt-8 border-b border-gray-200">
        <div className="flex gap-8 justify-center"> 
          <button
            onClick={() => setActiveTab("published")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "published"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Published ({publishedBlogs.length})
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "drafts"
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Drafts ({draftBlogs.length})
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "comments"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Comments ({comments.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {activeTab === "published" && (
              <div className="w-full flex flex-col items-center">
                {publishedBlogs.length > 0 ? (
                  publishedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">
                      You haven't published any blogs yet.
                    </p>
                    <Link
                      to="/blog/upload"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
                    >
                      Create Your First Blog
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "drafts" && (
              <div className="w-full flex flex-col items-center">
                {draftBlogs.length > 0 ? (
                  draftBlogs.map((blog) => (
                    <div key={blog.id} className="w-full flex flex-col items-center">
                      <BlogCard blog={blog} clickable={false} />
                      <div className="flex justify-end gap-2 -mt-4 mb-6 w-full sm:w-[75%] pr-12">
                        <Link
                          to={`/blog/edit/id/${blog.id}`}
                          className="px-4 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition"
                        >
                          Continue Editing
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">
                      You don't have any drafts.
                    </p>
                    <Link
                      to="/blog/upload"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
                    >
                      Start Writing
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "comments" && (
              <div className="w-full flex flex-col items-center"> 
                <MyComments comments={comments} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
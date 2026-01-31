import BlogCard from "@/components/cards/BlogCard";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = () => {
  const { user, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">User not found ❌</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Go back to home
        </Link>
      </div>
    );
  }

  const authorData = {
    id: user.id,
    name: user.name,
    image: user.image,
  };

  return (
    <div className="flex flex-col items-center m-auto gap-5 p-5">
      <img
        src={user.image }
        alt={user.name}
        className="h-52 w-52 rounded-full object-cover border-4 border-gray-200"
      />
      <h1 className="text-3xl font-bold">{user.name}</h1>

      {user.bio && <p className="text-gray-600 text-center max-w-2xl">{user.bio}</p>}

      <div className="flex gap-6 text-gray-600">
        <div className="text-center">
          <p className="font-bold text-xl">{user.blogs?.length || 0}</p>
          <p className="text-sm">Blogs</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{user.followers?.length || 0}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{user.following?.length || 0}</p>
          <p className="text-sm">Following</p>
        </div>
      </div>

      <h2 className="text-xl text-gray-600 mt-8 font-semibold">Blogs Posted</h2>

      <div className="w-full flex flex-col items-center">
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map((blogItem) => {
            
            const formattedBlog = {
              ...blogItem,
              author: authorData, 
              tags: blogItem.tags || [], 
              comments: blogItem.comments || [], 
              content: blogItem.content || "", 
            };
            
            return <BlogCard key={blogItem.id} blog={formattedBlog} />;
          })
        ) : (
          <p className="text-gray-500 text-center py-10">No blogs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
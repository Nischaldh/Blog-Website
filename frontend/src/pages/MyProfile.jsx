import EditableBlogCard from "@/components/cards/EditableBlogCard";
import MyComments from "@/components/MyComments";
import { useState } from "react";


const currentUser = {
  id: "auth2",
  name: "Nischal Dhungana",
  profile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  email: "nischal@example.com",
  blogs: [
    {
      id: 201,
      title: "Finding Focus in a Distracted World",
      slug: "finding-focus-in-a-distracted-world",
      content: `In today's hyper-connected world, distraction has become the default state of mind...`,
      created_at: "2026-02-01 09:15:30",
      primary_image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
      tags: ["Lifestyle", "Productivity", "Mental Health"],
      comments: [
        { id: 1, name: "Sita", content: "This really resonated with me." },
        { id: 2, name: "Ramesh", content: "Time blocking changed my life." },
      ],
    },
    {
      id: 202,
      title: "Why Travel Changes the Way You Think",
      slug: "why-travel-changes-the-way-you-think",
      content: `Travel is more than visiting new places or taking beautiful photos...`,
      created_at: "2026-02-03 14:42:10",
      primary_image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      tags: ["Travel", "Mindset", "Personal Growth"],
      comments: [
        { id: 3, name: "Aayush", content: "Travel really does reshape thinking." },
      ],
    },
  ],
  comments: [
    {
      id: 101,
      blogTitle: "The Art of Minimalism",
      blogSlug: "art-of-minimalism",
      content: "This is exactly what I needed to hear today!",
      created_at: "2026-01-28 10:30:00",
    },
    {
      id: 102,
      blogTitle: "Building Better Habits",
      blogSlug: "building-better-habits",
      content: "Great tips on habit formation. Thanks for sharing!",
      created_at: "2026-01-25 15:20:00",
    },
    {
      id: 103,
      blogTitle: "Digital Detox Guide",
      blogSlug: "digital-detox-guide",
      content: "I've been doing a digital detox for a week now and it's amazing.",
      created_at: "2026-01-20 09:15:00",
    },
  ],
};

const MyProfile = () => {
  const [user, setUser] = useState(currentUser);

  const author = {
    name: user.name,
    id: user.id,
    profile: user.profile,
  };

  const handleDeleteBlog = (blogId) => {
    setUser({
      ...user,
      blogs: user.blogs.filter((blog) => blog.id !== blogId),
    });
    alert("Blog deleted successfully!");
  };

  return (
    <div className="flex flex-col items-center m-auto gap-5 p-5 max-w-6xl ">
      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={user.profile}
          alt={user.name}
          className="h-52 w-52 rounded-full object-cover shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Blogs Section */}
      <div className="w-full mt-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">My Blogs</h2>
        <div className="w-full flex flex-col items-center">
          {user.blogs.length > 0 ? (
            user.blogs.map((blogItem) => (
              <EditableBlogCard
                key={blogItem.id}
                blog={blogItem}
                author={author}
                onDelete={handleDeleteBlog}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">
              You haven't posted any blogs yet.
            </p>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <MyComments comments={user.comments} />
    </div>
  );
};

export default MyProfile;
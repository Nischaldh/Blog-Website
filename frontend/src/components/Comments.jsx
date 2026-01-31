import { useState } from "react";
import datas from "@/constants/data";
import CommentCard from "./cards/CommentCard";

const loggedInUser = {
  name: "Nischal Dhungana",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
};

const Comments = ({ blogId }) => {
  const blog = datas.find((data) => data.id === blogId);
  const [comments, setComments] = useState(blog?.comments || []);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      name: loggedInUser.name,
      avatar: loggedInUser.avatar,
      content: text,
    };

    setComments([newComment, ...comments]);
    setText("");
  };

  return (
    <div className="mt-12 w-full max-w-3xl">
      <h4 className="font-bold text-lg mb-4">Comments</h4>

      {/* Write comment */}
      <div className="flex gap-3 mb-6">
        <img
          src={loggedInUser.avatar}
          alt="user"
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-1 bg-black text-white text-sm rounded-md"
          >
            Post
          </button>
        </div>
      </div>

      {/* Render comments */}
      <div>
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}

        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;

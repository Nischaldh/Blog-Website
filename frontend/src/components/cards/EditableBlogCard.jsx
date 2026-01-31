import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";

const EditableBlogCard = ({ blog, author, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog/edit/${blog.slug}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this blog?")) {
      onDelete(blog.id);
    }
  };

  return (
    <div className="relative group w-full sm:w-[75%]">
      <BlogCard blog={blog} author={author} />

      {/* Edit and Delete Icons */}
      <div className="absolute top-12 right-12 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition"
          title="Edit blog"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
          title="Delete blog"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EditableBlogCard;
const CommentCard = ({ comment }) => {
  return (
    <div className="flex gap-3 py-4 border-b">
      <img
        src={comment.avatar}
        alt={comment.name}
        className="w-9 h-9 rounded-full"
      />

      <div>
        <p className="font-semibold text-gray-800 text-sm">
          {comment.name}
        </p>
        <p className="text-gray-600 text-sm">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;


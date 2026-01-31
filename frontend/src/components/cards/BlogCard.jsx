import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const {
    title,
    content,
    slug,
    created_at,
    primary_image,
    tags,
    comments,
    author,
  } = blog;
  return (
    <Link
      to={`/blog/${slug}`}
      className="m-10 w-full sm:w-[75%] hover:cursor-pointer -ml-0.5 p-2"
    >
      <Card className="relative mx-auto w-full min-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={primary_image}
          alt="Blog cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 min-h-[50%]"
        />
        <div className="flex -my-4 items-center justify-between px-1">
          <span className="rounded-full flex items-center">
            <img
              src={author?.image}
              alt="Profile Pic"
              className="w-7 h-7 rounded-full mr-2"
            />
            <p className="text-sm text-gray-600">{author?.name}</p>
          </span>
          <p className="text-sm text-gray-600">
            Date: {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
        <CardHeader>
          <CardTitle className="m-auto text-2xl">{title}</CardTitle>
          <CardDescription>
            {content.length > 200 ? content.substring(0, 200) + "..." : content}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-gray-600">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;

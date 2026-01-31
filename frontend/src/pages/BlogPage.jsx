import { useParams } from "react-router-dom";
import datas from "@/constants/data";
import Comments from "@/components/Comments";

const BlogPage = () => {
  const { slug } = useParams();

  const blog = datas.find((item) => item.slug === slug);
  const {
    id,
    title,
    content,
    primary_image,
    author,
    created_at,
    secondary_image1,
    secondary_image2,
    tags=[]
  } = blog;

  if (!blog) {
    return <div className="p-10">Blog not found ❌</div>;
  }

  return (
    <div className="w-full flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-12">{title}</h1>
      <img src={primary_image} alt={title} className="w-full rounded-lg mb-6" />
      <div className="my-6 text-sm text-gray-500 flex justify-between items-center w-full">
        <span className="flex items-center">
          <img
            src={author.profile}
            alt="author"
            className="w-8 h-8 rounded-full mr-3"
          />
          {author.name}
        </span>
        <span>Date: {created_at.split(" ")[0]}</span>
      </div>

      <div className="text-gray-700 leading-relaxed space-y-4">
        {content
          .trim()
          .split("\n\n")
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>

      {(secondary_image1 || secondary_image2) && (
        <div className="mt-10 w-full">
          <h2 className="text-xl font-semibold mb-4">More Images</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondary_image1 && (
              <img
                src={secondary_image1}
                alt="secondary"
                className="w-full rounded-lg object-cover max-sm:h-50"
              />
            )}

            {secondary_image2 && (
              <img
                src={secondary_image2}
                alt="secondary"
                className="w-full rounded-lg object-cover max-sm:h-50"
              />
            )}
          </div>
        </div>
      )}

            
        <div className="mt-10 w-full">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      <Comments blogId = {id}/>
    </div>
  );
};

export default BlogPage;

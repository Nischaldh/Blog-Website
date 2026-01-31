import BlogCard from "@/components/cards/BlogCard";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlog } from "@/hooks/useContexts";

const HomePage = () => {
  const { blogs, loading } = useBlog();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("title") || "";

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ title: query });
    } else {
      setSearchParams({});
    }
  };
  console.log(blogs);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center p-1">
      <h1 className="text-4xl my-5">Home page</h1>
      <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            {searchQuery
              ? `No blogs found for "${searchQuery}"`
              : "No blogs available"}
          </p>
        </div>
      ) : (
        <>
          {searchQuery && (
            <p className="text-gray-600 mb-4">
              Found {filteredBlogs.length} blog
              {filteredBlogs.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
          {filteredBlogs.map((blog) => (
            <BlogCard blog={blog}  key={blog.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default HomePage;

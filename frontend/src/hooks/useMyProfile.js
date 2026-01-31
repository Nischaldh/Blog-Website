import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useUser } from "./useContexts";

export const useMyProfile = () => {
  const { user } = useAuth();
  const { fetchUserBlogs, fetchUserComments } = useUser();
  const [activeTab, setActiveTab] = useState("published");
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadAllData = async () => {
      if (dataLoaded) return; 
      
      setLoading(true);
      
      const [blogsResult, commentsResult] = await Promise.all([
        fetchUserBlogs(),
        fetchUserComments()
      ]);
      
      if (blogsResult.success) {
        const blogs = blogsResult.blogs || [];
        const published = blogs.filter(blog => blog.status === "PUBLISHED");
        const drafts = blogs.filter(blog => blog.status === "DRAFT");
        
        setPublishedBlogs(published);
        setDraftBlogs(drafts);
      }
      
      if (commentsResult.success) {
        setComments(commentsResult.comments || []);
      }
      
      setLoading(false);
      setDataLoaded(true);
    };

    loadAllData();
  }, [fetchUserBlogs, fetchUserComments, dataLoaded]);

  return {
    user,
    activeTab,
    setActiveTab,
    publishedBlogs,
    draftBlogs,
    comments,
    loading,
  };
};
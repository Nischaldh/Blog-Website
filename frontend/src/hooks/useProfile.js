import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "./useContexts";

export const useProfile = () => {
  const { id } = useParams();
  const { fetchUserById } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const result = await fetchUserById(id);
      if (result.success) {
        setUser(result.user);
      }
      setLoading(false);
    };
    loadUser();
  }, [id, fetchUserById]);

  const author = user
    ? {
        name: user.name,
        id: user.id,
        profile: user.image,
        profilePic: user.image,
        username: user.name,
      }
    : null;

  return {
    user,
    loading,
    author,
  };
};
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = () => {
  const router = useRouter();
  const { id, name } = router.query; // Using router.query to get the id and name
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!id) return; // Early return if id is not available
      
      try {
        const response = await fetch(`/api/users/${id}/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchPosts();
  }, [id]); // Dependency on id, will re-fetch if id changes

  if (loading) {
    return <div>Loading...</div>; // You can customize your loading state here
  }

  return (
    <Profile
      name={name || 'User'} // Default name if not provided
      desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
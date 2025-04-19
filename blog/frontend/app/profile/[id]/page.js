"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const PublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userRes = await axios.get(`http://localhost:8000/users/${id}`);
      const postsRes = await axios.get(`http://localhost:8000/posts/user/${id}`);

      setUser(userRes.data);
      setPosts(postsRes.data);
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUserData();
  }, [id]);

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (!user) return <div className="p-8">User not found.</div>;

  return (
    <div className="min-h-screen bg-[#FFEFD7] text-black p-8">
      <div className="flex gap-4 mb-6 border-b-2 border-black pb-4">
        <img
          src={user.user_image || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-black object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Posts by {user.username}</h3>
      {posts.length === 0 ? (
        <p>This user hasn’t posted anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border-2 border-black p-4">
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p className="text-gray-800 mt-2">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicProfile;

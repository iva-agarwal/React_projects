"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useAuthRedirect(); // protect route

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchUserAndPosts = async () => {
    try {
      const userRes = await axios.get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userRes.data);

      const postsRes = await axios.get(
        `http://localhost:8000/posts/user/${userRes.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(postsRes.data);
    } catch (error) {
      console.error("Failed to fetch profile or posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserAndPosts();
    }
  }, [token]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FFEFD7] text-black p-8">
      {user && (
        <div className="flex items-center gap-6 mb-10 border-b-2 pb-6 border-black">
          <img
            src={user.user_image || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-black"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-sm text-gray-600">
              Joined on {formatDate(user.created_at)}
            </p>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
      {posts.length === 0 ? (
        <p>You haven’t posted anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border-2 border-black p-4 bg-white">
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p className="text-gray-800 mt-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-4">
                Posted on {formatDate(post.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

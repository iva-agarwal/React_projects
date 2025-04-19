"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../components/SearchBar";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null); // To hold the current user info

  useAuthRedirect();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data); // Set current logged-in user data
        setShowForm(true); // Show form if logged in
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setShowForm(false); // Hide form if user is not logged in
      }
    } else {
      setShowForm(false); // Hide form if token doesn't exist
    }
  };

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUser(); // Fetch current logged-in user data when page loads
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:8000/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setContent("");
      fetchPosts(); // Refresh the post list after posting
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="bg-[#FFEFD7] min-h-screen text-black ">
      <div className="mx-auto">
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showForm && user && (
            <form onSubmit={handleCreatePost} className="p-6 border-b-2 border-black">
              <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4 p-3 border border-black"
                required
              />
              <textarea
                placeholder="Post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full mb-4 p-3 border border-black h-32"
                required
              />
              <button
                type="submit"
                className="bg-[#E9846C] text-white px-6 py-2 border border-black"
              >
                Submit
              </button>
            </form>
          )}

          {posts.map((post) => (
            <div key={post.id} className="border-b-2 border-black p-6">
              {/* Displaying the user info directly from the post */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border border-black p-1 overflow-hidden">
                  <img
                    src={post.user_image || "https://via.placeholder.com/100"} // Using the user_image from the post
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{post.username}</p> {/* Using the username from the post */}
                  <p className="text-sm text-gray-600">{formatDate(post.created_at)}</p>
                </div>
              </div>

              {/* Post content */}
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

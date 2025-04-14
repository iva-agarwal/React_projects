"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      setShowForm(false);
      fetchPosts(); // refresh post list
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="bg-[#FFEFD7] min-h-screen text-black p-10">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Recent Posts</h1>
        
        </div>


        {posts.length === 0 ? (
          <p className="text-center">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <form
            onSubmit={handleCreatePost}
            className="p-6 border-b-2 border-black "
          >
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
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-b-2 border-black p-6 "
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

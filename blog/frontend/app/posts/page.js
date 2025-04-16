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

  useAuthRedirect();

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
      setShowForm(false);
      fetchPosts(); // refresh post list
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="bg-[#FFEFD7] min-h-screen text-black ">
      <SearchBar/>
      <div className=" mx-auto">
      
        {posts.length === 0 ? (
          <p className="text-center">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
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
                <h2 className="text-xl font-semibold mb-2 flex flex-col">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-gray-600 text-sm pt-4 ">{formatDate(post.created_at)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default Page;

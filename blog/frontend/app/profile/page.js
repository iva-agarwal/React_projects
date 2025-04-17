"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({ username: "", user_image: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useAuthRedirect();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchUserAndPosts = async () => {
    try {
      const userRes = await axios.get("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userRes.data);
      setEditableUser({
        username: userRes.data.username,
        user_image: userRes.data.user_image || "",
      });

      const postsRes = await axios.get(
        `http://localhost:8000/posts/user/${userRes.data.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts(postsRes.data);
    } catch (error) {
      console.error("Failed to fetch profile or posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserAndPosts();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("username", editableUser.username);
      if (selectedFile) formData.append("user_image", selectedFile);

      const res = await axios.put("http://localhost:8000/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data);
      setEditMode(false);
      setSelectedFile(null);
      setPreviewImage("");
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableUser({ username: user.username, user_image: user.user_image });
    setPreviewImage("");
    setSelectedFile(null);
  };

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
        <div className="flex items-start gap-6 mb-10 border-b-2 pb-6 border-black">
          <div className="relative">
            <img
              src={previewImage || editableUser.user_image || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-black object-cover"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 w-24 h-24 opacity-0 cursor-pointer"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 w-full max-w-md">
            {editMode ? (
              <>
                <label className="font-semibold">Username</label>
                <input
                  type="text"
                  value={editableUser.username}
                  onChange={(e) =>
                    setEditableUser({ ...editableUser, username: e.target.value })
                  }
                  className="border-2 border-black p-2"
                />

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border-2 border-black px-4 py-2 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-sm text-gray-600">
                  Joined on {formatDate(user.created_at)}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-3 text-sm text-blue-600 hover:underline"
                >
                  ✏️ Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
      {posts.length === 0 ? (
        <p>You haven’t posted anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border-2 border-black p-4">
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

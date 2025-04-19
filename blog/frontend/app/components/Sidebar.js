"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import axios from "axios";

const Sidebar = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(res.data.id);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  return (
    <aside className="w-24 fixed top-0 left-0 h-screen border-r-2 border-black p-4 bg-[#FFEFD7] z-50">
      <nav className="flex flex-col text-lg items-center justify-between h-full">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 hover:underline">
            <Home size={20} />
          </Link>

          <Link href="/posts" className="flex items-center gap-3 hover:underline">
            <FileText size={20} />
          </Link>

          {userId && (
            <Link href={`/profile/${userId}`} className="flex items-center gap-3 hover:underline">
              <User size={20} />
            </Link>
          )}
        </div>

        <div>
          <Link href="/settings" className="flex items-center gap-3 hover:underline">
            <Settings size={20} />
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 hover:underline mt-10 text-left"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

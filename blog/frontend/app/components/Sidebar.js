"use client";
import Link from "next/link";
import {
  Home,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-24 border-r-2 border-black p-4  min-h-screen">
      <nav className="flex flex-col gap-6 text-lg items-center justify-center">
        <Link href="/" className="flex items-center gap-3 hover:underline">
          <Home size={20} />
        
        </Link>
        <Link href="/posts" className="flex items-center gap-3 hover:underline">
          <FileText size={20} />
        </Link>
        <Link href="/profile" className="flex items-center gap-3 hover:underline">
          <User size={20} />
          
        </Link>
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
      </nav>
    </aside>
  );
};

export default Sidebar;

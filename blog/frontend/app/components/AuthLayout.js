"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { SearchBar } from "./SearchBar";

const AuthLayout = ({ children }) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // prevents flicker

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setCheckingAuth(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Token check failed", err);
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    verifyToken();

    // Revalidate every 30 seconds
    const interval = setInterval(verifyToken, 30_000);
    return () => clearInterval(interval);
  }, [pathname]); // also re-verify on route change

  if (checkingAuth) {
    return <div className="p-4">Loading layout...</div>;
  }

  return (
    <div className="flex flex-col w-full">

      {/* Layout for Sidebar and Content */}
      <div className="flex flex-row w-full">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 ml-24">{children}</main>
      </div>
    </div>
  );
};


export default AuthLayout;

"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const AuthLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
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
      }
    };
  
    // Initial check
    verifyToken();
  
    // Revalidate every 30 seconds
    const interval = setInterval(verifyToken, 30_000);
  
    return () => clearInterval(interval); // Clean up
  }, []);
  

  return (
    <div className="flex flex-row w-full">
      {isAuthenticated && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;

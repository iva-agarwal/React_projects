"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const AuthLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [pathname]); // triggers whenever the route changes

  return (
    <div className="flex flex-row w-full">
      {isAuthenticated && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;

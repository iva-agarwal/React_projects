"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      // Optionally: Validate token by hitting an auth endpoint
      // If invalid, remove token and redirect
    }
  }, [router]);
}

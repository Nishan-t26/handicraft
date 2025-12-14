"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, []);
}

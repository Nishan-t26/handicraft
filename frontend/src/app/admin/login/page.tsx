"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { token } = await adminLogin(email, password);
      localStorage.setItem("adminToken", token);
      router.push("/admin/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-32 space-y-4">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2"
        required
      />
      <button className="w-full bg-btn-primary hover:bg-btn-primary-hover text-btn-text py-2 rounded transition-colors">Login</button>
    </form>
  );
}

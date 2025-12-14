"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/api";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await adminLogin(email, password);
      localStorage.setItem("adminToken", token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-light p-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-heading font-bold text-primary">
              Handicraft
            </h1>
            <p className="text-text-muted text-sm mt-1">Admin Portal</p>
          </Link>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          <h2 className="heading-3 text-center mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-error-bg text-error text-sm flex items-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              ← Back to Store
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-sm mt-8">
          © {new Date().getFullYear()} Handicraft. All rights reserved.
        </p>
      </div>
    </div>
  );
}

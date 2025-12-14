"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AddProductPage() {
  useAdminAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    router.push("/admin/products");
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-xl space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full"
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Save Product"}
        </button>
      </form>
    </>
  );
}

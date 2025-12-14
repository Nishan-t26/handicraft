"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function EditProductPage() {
  useAdminAuth();
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    setSaving(false);
    router.push("/admin/products");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-xl space-y-4"
      >
        <input
          type="text"
          name="name"
          defaultValue={product.name}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          defaultValue={product.price}
          required
          className="w-full border p-2 rounded"
        />

        <div>
          <p className="text-sm mb-1">Current Image</p>
          {product.images && product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-32 object-cover mb-2"
            />
          )}
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
        />

        <button
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
    </>
  );
}

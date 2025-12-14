"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminProducts, deleteProduct } from "@/services/api";
import { Product } from "@/types/product";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminProductsPage() {
  useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (error) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await deleteProduct(id);
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-4">{product.name}</td>
              <td className="p-4 text-center">₹{product.price}</td>
              <td className="p-4 text-center space-x-2">
                <Link
                  href={`/admin/products/edit/${product._id}`}
                  className="px-3 py-1 border rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

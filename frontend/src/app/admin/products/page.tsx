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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-text-secondary">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/add" className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden bg-card-bg">
        <table className="w-full">
          <thead>
            <tr className="bg-background-secondary border-b border-card-border">
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Product</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Price</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Stock</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-background-secondary transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-text-primary">{product.name}</p>
                      {product.category && (
                        <span className="badge badge-secondary text-xs">{product.category}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="price">₹{product.price.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  {product.stock !== undefined ? (
                    <span
                      className={`badge ${
                        product.stock > 10
                          ? "badge-success"
                          : product.stock > 0
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  ) : (
                    <span className="text-text-muted">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-ghost btn-sm text-error"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="heading-4 text-text-primary mb-2">No products yet</h3>
            <p className="text-text-secondary mb-6">Get started by adding your first product</p>
            <Link href="/admin/products/add" className="btn btn-primary">
              Add Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

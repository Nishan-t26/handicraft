"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function EditProductPage() {
  useAdminAuth();
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
        <Link href="/admin/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-text-primary">Edit</span>
      </nav>

      <div className="card bg-card-bg">
        <div className="p-6 border-b border-card-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">Edit Product</h2>
          <p className="text-text-secondary text-sm mt-1">Update the product details</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              required
              className="input"
            />
          </div>

          {/* Price & Stock Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-text-primary mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={product.price}
                required
                min="0"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-text-primary mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                defaultValue={product.stock || 0}
                min="0"
                className="input"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
              Category
            </label>
            <select id="category" name="category" defaultValue={product.category || ""} className="input">
              <option value="">Select a category</option>
              <option value="Pottery">Pottery</option>
              <option value="Textiles">Textiles</option>
              <option value="Woodwork">Woodwork</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Paintings">Paintings</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description || ""}
              placeholder="Describe your product..."
              className="input resize-none"
            />
          </div>

          {/* Current Image */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Product Image
            </label>
            
            {/* Show current image */}
            {product.images && product.images[0] && !imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-2">Current image:</p>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-32 rounded-lg object-cover"
                />
              </div>
            )}

            {/* Upload new image */}
            <div className="border-2 border-dashed border-card-border rounded-xl p-6 text-center hover:border-primary transition-colors bg-background-secondary">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <svg className="w-12 h-12 mx-auto text-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-text-secondary">Click to upload a new image</p>
                  <p className="text-text-muted text-sm mt-1">Leave empty to keep current image</p>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-card-border">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </button>
            <Link href="/admin/products" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

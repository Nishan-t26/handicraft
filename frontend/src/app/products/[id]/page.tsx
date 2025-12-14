"use client";

import { use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById } from "@/services/api";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const router = useRouter();

  // We need to handle this client-side with useEffect or make it a server component
  // For now, let's use a simpler approach
  const ProductContent = () => {
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [selectedImage, setSelectedImage] = React.useState(0);

    React.useEffect(() => {
      getProductById(resolvedParams.id)
        .then(setProduct)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    function handleAddToCart() {
      if (!product) return;
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      });
      router.push("/checkout");
    }

    if (loading) {
      return (
        <div className="section bg-background">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="skeleton h-96 rounded-2xl" />
              <div className="space-y-4">
                <div className="skeleton h-10 w-3/4" />
                <div className="skeleton h-6 w-1/4" />
                <div className="skeleton h-24 w-full" />
                <div className="skeleton h-12 w-48" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="section bg-background text-center">
          <h1 className="heading-2 text-text-primary mb-4">Product Not Found</h1>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      );
    }

    return (
      <div className="section bg-background">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-text-primary font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="card overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        index === selectedImage
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {product.category && (
                <span className="badge badge-secondary">
                  {product.category}
                </span>
              )}

              <h1 className="text-4xl font-heading font-bold text-text-primary">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="price text-3xl">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.stock !== undefined && (
                  <span
                    className={`badge ${
                      product.stock > 0 ? "badge-success" : "badge-error"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                )}
              </div>

              <div className="border-t border-card-border pt-6">
                <p className="text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-card-border">
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Handcrafted</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm">Easy Returns</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm">Quality Assured</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn btn-primary btn-lg w-full"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <Link
                  href="/products"
                  className="btn btn-outline btn-lg w-full"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <ProductContent />
      <Footer />
    </>
  );
}

import React from "react";

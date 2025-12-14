"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    router.push("/checkout");
  }

  return (
    <Link href={`/products/${product._id}`}>
      <article className="card card-interactive group cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="btn btn-accent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              Add to Cart
            </button>
          </div>

          {/* Category Badge */}
          {product.category && (
            <span className="absolute top-3 left-3 badge badge-secondary">
              {product.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-2 text-sm text-text-secondary line-clamp-2 flex-grow">
              {product.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="price text-xl">₹{product.price.toLocaleString()}</span>

            {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
              <span className="badge badge-warning text-xs">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleAddToCart() {
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
    <div className="border rounded p-4 hover:shadow">
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <h2 className="mt-2 font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-black text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

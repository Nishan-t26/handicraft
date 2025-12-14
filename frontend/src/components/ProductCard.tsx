import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded p-4 hover:shadow">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-40 w-full object-cover"
        />
        <h2 className="mt-2 font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">₹{product.price}</p>
      </div>
    </Link>
  );
}

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Handmade Vase",
    price: 1200,
    images: ["/vase.jpg"],
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </main>
    </>
  );
}

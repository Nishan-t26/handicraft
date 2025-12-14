import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/api";
import { Product } from "@/types/product";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <>
      <Navbar />
      <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </main>
    </>
  );
}

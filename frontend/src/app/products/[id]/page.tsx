import Navbar from "@/components/Navbar";
import { getProductById } from "@/services/api";
import { Product } from "@/types/product";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product: Product = await getProductById(params.id);

  return (
    <>
      <Navbar />
      <main className="p-8 max-w-3xl mx-auto">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />

        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 text-xl font-semibold">₹{product.price}</p>
      </main>
    </>
  );
}

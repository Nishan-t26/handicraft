import Navbar from "@/components/Navbar";

export default function ProductDetail() {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold">Product Name</h1>
        <p className="mt-4">Product description here</p>
        <p className="mt-2 font-semibold">₹1200</p>
      </main>
    </>
  );
}

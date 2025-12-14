export default function AddProductPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form className="bg-white p-6 rounded shadow max-w-xl">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full mb-4 p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="file"
          className="w-full mb-4"
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Save Product
        </button>
      </form>
    </>
  );
}

import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-4">Handmade Vase</td>
            <td className="p-4 text-center">₹1200</td>
            <td className="p-4 text-center space-x-2">
              <button className="px-3 py-1 border rounded">Edit</button>
              <button className="px-3 py-1 border rounded text-red-600">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

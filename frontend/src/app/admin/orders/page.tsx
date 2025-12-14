export default function OrdersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-4">Customer</th>
            <th className="p-4">Total</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-4">Rahul Sharma</td>
            <td className="p-4">₹2400</td>
            <td className="p-4">Pending</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

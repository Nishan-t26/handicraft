export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold mt-2">$0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

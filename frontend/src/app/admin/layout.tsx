import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block hover:text-gray-300">
            Products
          </Link>
          <Link href="/admin/orders" className="block hover:text-gray-300">
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
}

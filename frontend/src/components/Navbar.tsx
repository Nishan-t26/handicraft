import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <Link href="/" className="text-xl font-bold">
        Handicraft Store
      </Link>

      <div className="space-x-4">
        <Link href="/products">Products</Link>
        <Link href="/admin/login">Admin</Link>
      </div>
    </nav>
  );
}

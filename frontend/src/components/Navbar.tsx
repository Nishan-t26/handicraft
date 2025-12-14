"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-navbar border-b border-navbar-border">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-primary font-heading tracking-tight">
            Handicraft
          </span>
          <span className="text-accent text-sm font-medium hidden sm:inline">
            Artisan Store
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-text-secondary hover:text-primary transition-colors font-medium"
          >
            Products
          </Link>

          <Link
            href="/checkout"
            className="relative text-text-secondary hover:text-primary transition-colors font-medium"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin/login"
            className="btn btn-outline btn-sm hidden sm:inline-flex"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

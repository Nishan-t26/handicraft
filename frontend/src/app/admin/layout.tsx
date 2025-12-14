"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  // Get current page title
  function getPageTitle() {
    if (pathname.includes("/admin/products/add")) return "Add Product";
    if (pathname.includes("/admin/products/edit")) return "Edit Product";
    return navItems.find((item) => pathname.startsWith(item.href))?.name || "Admin";
  }

  return (
    <div className="flex min-h-screen bg-background-secondary">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col fixed h-full bg-gradient-to-b from-[#1a4d3e] to-[#143d32]">
        {/* Logo */}
        <div className="p-6 border-b border-white/15">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">Handicraft</h2>
              <p className="text-xs text-white/60">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#1a4d3e] shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/15">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-background-secondary min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 px-8 py-5 flex justify-between items-center bg-card-bg border-b border-card-border shadow-sm">
          <div>
            <h1 className="text-2xl font-heading font-bold text-text-primary">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-background-secondary hover:bg-background-muted transition-colors">
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {/* Admin Avatar */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white font-semibold text-sm shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

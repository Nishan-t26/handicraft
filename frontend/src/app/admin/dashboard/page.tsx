"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminDashboardPage() {
  useAdminAuth();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl mt-2">34</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-2xl mt-2">5</p>
        </div>
      </div>
    </>
  );
}

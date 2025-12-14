"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminOrdersPage() {
  useAdminAuth();

  const orders = [
    { id: "#1234", customer: "Rahul Sharma", email: "rahul@example.com", total: 2400, status: "Pending", date: "Dec 14, 2024" },
    { id: "#1233", customer: "Priya Patel", email: "priya@example.com", total: 4500, status: "Shipped", date: "Dec 13, 2024" },
    { id: "#1232", customer: "Amit Kumar", email: "amit@example.com", total: 1800, status: "Delivered", date: "Dec 12, 2024" },
  ];

  function getStatusBadge(status: string) {
    switch (status) {
      case "Pending":
        return "badge-warning";
      case "Shipped":
        return "badge-primary";
      case "Delivered":
        return "badge-success";
      default:
        return "badge-secondary";
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-text-secondary">Manage customer orders</p>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden bg-card-bg">
        <table className="w-full">
          <thead>
            <tr className="bg-background-secondary border-b border-card-border">
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Order</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Customer</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Total</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-background-secondary transition-colors">
                <td className="px-6 py-4">
                  <span className="font-semibold text-primary">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-text-primary">{order.customer}</p>
                    <p className="text-sm text-text-muted">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="price">₹{order.total.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`badge ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-text-secondary">
                  {order.date}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="btn btn-ghost btn-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="heading-4 text-text-primary mb-2">No orders yet</h3>
            <p className="text-text-secondary">Orders will appear here when customers make purchases</p>
          </div>
        )}
      </div>
    </div>
  );
}

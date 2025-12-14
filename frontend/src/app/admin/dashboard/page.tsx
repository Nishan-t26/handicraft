"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminDashboardPage() {
  useAdminAuth();

  const stats = [
    {
      label: "Total Products",
      value: "12",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      label: "Total Orders",
      value: "34",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      label: "Pending Orders",
      value: "5",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

  const activities = [
    { action: "New order received", time: "2 minutes ago", type: "order" },
    { action: "Product stock updated", time: "1 hour ago", type: "product" },
    { action: "Order #1234 shipped", time: "3 hours ago", type: "order" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6 bg-card-bg">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card bg-card-bg">
        <div className="p-6 border-b border-card-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-secondary hover:bg-background-muted transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "order" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                }`}>
                  {activity.type === "order" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.action}</p>
                  <p className="text-sm text-text-muted">{activity.time}</p>
                </div>
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

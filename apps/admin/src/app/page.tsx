"use client";

import {
  DollarSign,
  CalendarCheck,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const statsCards = [
  {
    title: "Total Revenue",
    value: "INR 12,45,000",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    color: "bg-emerald-500",
  },
  {
    title: "Total Bookings",
    value: "1,284",
    change: "+8.2%",
    trend: "up" as const,
    icon: CalendarCheck,
    color: "bg-sky-500",
  },
  {
    title: "Active Packages",
    value: "42",
    change: "+3",
    trend: "up" as const,
    icon: Package,
    color: "bg-gold-500",
  },
  {
    title: "Registered Users",
    value: "3,847",
    change: "+156",
    trend: "up" as const,
    icon: Users,
    color: "bg-navy-600",
  },
];

const revenueData = [
  { month: "Jan", revenue: 245000, bookings: 180 },
  { month: "Feb", revenue: 312000, bookings: 220 },
  { month: "Mar", revenue: 289000, bookings: 195 },
  { month: "Apr", revenue: 378000, bookings: 280 },
  { month: "May", revenue: 420000, bookings: 310 },
  { month: "Jun", revenue: 395000, bookings: 290 },
  { month: "Jul", revenue: 480000, bookings: 350 },
  { month: "Aug", revenue: 520000, bookings: 380 },
  { month: "Sep", revenue: 460000, bookings: 330 },
  { month: "Oct", revenue: 510000, bookings: 360 },
  { month: "Nov", revenue: 550000, bookings: 400 },
  { month: "Dec", revenue: 620000, bookings: 450 },
];

const recentBookings = [
  {
    id: "BK-1001",
    customer: "Rajesh Kumar",
    type: "Tour Package",
    destination: "Kashmir",
    amount: "INR 45,000",
    status: "Confirmed",
    date: "2024-12-15",
  },
  {
    id: "BK-1002",
    customer: "Priya Sharma",
    type: "Hotel",
    destination: "Goa",
    amount: "INR 12,500",
    status: "Pending",
    date: "2024-12-14",
  },
  {
    id: "BK-1003",
    customer: "Amit Patel",
    type: "Flight",
    destination: "Delhi - Mumbai",
    amount: "INR 8,200",
    status: "Confirmed",
    date: "2024-12-14",
  },
  {
    id: "BK-1004",
    customer: "Sneha Reddy",
    type: "Tour Package",
    destination: "Kerala",
    amount: "INR 32,000",
    status: "Cancelled",
    date: "2024-12-13",
  },
  {
    id: "BK-1005",
    customer: "Vikram Singh",
    type: "Bus",
    destination: "Jaipur - Udaipur",
    amount: "INR 1,800",
    status: "Confirmed",
    date: "2024-12-13",
  },
];

const topDestinations = [
  { name: "Kashmir", bookings: 245, revenue: "INR 28,50,000", growth: "+18%" },
  { name: "Goa", bookings: 198, revenue: "INR 15,20,000", growth: "+12%" },
  { name: "Kerala", bookings: 176, revenue: "INR 22,40,000", growth: "+9%" },
  { name: "Rajasthan", bookings: 154, revenue: "INR 18,60,000", growth: "+15%" },
  { name: "Himachal Pradesh", bookings: 132, revenue: "INR 14,80,000", growth: "+7%" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Confirmed":
      return "badge-success";
    case "Pending":
      return "badge-warning";
    case "Cancelled":
      return "badge-danger";
    default:
      return "badge-neutral";
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here is your business overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="admin-select text-sm py-2 w-auto">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="admin-card group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                  <p className="text-2xl font-bold text-navy-800 mt-1">{card.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {card.trend === "up" ? (
                      <TrendingUp size={14} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        card.trend === "up" ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {card.change}
                    </span>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className={`${card.color} p-2.5 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-navy-800">Revenue Overview</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-navy-600 rounded-sm" />
                <span className="text-xs text-gray-500">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-gold-500 rounded-sm" />
                <span className="text-xs text-gray-500">Bookings</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1B3A5C",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                }}
                formatter={(value: number, name: string) => [
                  name === "revenue" ? `INR ${value.toLocaleString()}` : value,
                  name === "revenue" ? "Revenue" : "Bookings",
                ]}
              />
              <Bar dataKey="revenue" fill="#1B3A5C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bookings" fill="#E8A317" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-800">Top Destinations</h2>
            <button className="text-xs text-navy-600 hover:text-navy-800 font-medium">View all</button>
          </div>
          <div className="space-y-4">
            {topDestinations.map((dest, idx) => (
              <div key={dest.name} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-navy-50 rounded-lg flex items-center justify-center text-sm font-semibold text-navy-600">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-gold-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-navy-800 truncate">{dest.name}</p>
                  </div>
                  <p className="text-xs text-gray-500">{dest.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-navy-800">{dest.revenue}</p>
                  <p className="text-xs text-emerald-600 font-medium">{dest.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-800">Recent Bookings</h2>
          <button className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1">
            View all <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Destination</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-medium text-navy-700">{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>
                    <span className="badge-info">{booking.type}</span>
                  </td>
                  <td>{booking.destination}</td>
                  <td className="font-medium">{booking.amount}</td>
                  <td>
                    <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                  </td>
                  <td className="text-gray-500">{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

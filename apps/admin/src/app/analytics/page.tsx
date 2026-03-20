"use client";

import { useState } from "react";
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Users,
  CalendarCheck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const monthlyRevenue = [
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

const bookingsByType = [
  { name: "Tour Packages", value: 45, color: "#1B3A5C" },
  { name: "Hotels", value: 28, color: "#4A90D9" },
  { name: "Flights", value: 18, color: "#E8A317" },
  { name: "Buses", value: 9, color: "#10b981" },
];

const dailyBookings = [
  { day: "Mon", bookings: 42 },
  { day: "Tue", bookings: 38 },
  { day: "Wed", bookings: 55 },
  { day: "Thu", bookings: 47 },
  { day: "Fri", bookings: 62 },
  { day: "Sat", bookings: 78 },
  { day: "Sun", bookings: 71 },
];

const revenueByCategory = [
  { category: "Adventure", revenue: 1850000, percentage: 32 },
  { category: "Beach", revenue: 1240000, percentage: 21 },
  { category: "Heritage", revenue: 980000, percentage: 17 },
  { category: "Nature", revenue: 870000, percentage: 15 },
  { category: "Honeymoon", revenue: 520000, percentage: 9 },
  { category: "Pilgrimage", revenue: 340000, percentage: 6 },
];

const userGrowth = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1450 },
  { month: "Mar", users: 1680 },
  { month: "Apr", users: 1920 },
  { month: "May", users: 2180 },
  { month: "Jun", users: 2450 },
  { month: "Jul", users: 2780 },
  { month: "Aug", users: 3050 },
  { month: "Sep", users: 3280 },
  { month: "Oct", users: 3480 },
  { month: "Nov", users: 3650 },
  { month: "Dec", users: 3847 },
];

const kpis = [
  {
    title: "Total Revenue",
    value: "INR 58,00,000",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500",
  },
  {
    title: "Avg. Booking Value",
    value: "INR 22,500",
    change: "+5.3%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-sky-500",
  },
  {
    title: "Total Bookings",
    value: "3,845",
    change: "+12.8%",
    trend: "up",
    icon: CalendarCheck,
    color: "bg-gold-500",
  },
  {
    title: "New Users",
    value: "567",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    color: "bg-navy-600",
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("year");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Business performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-1 py-1">
            {["7d", "30d", "90d", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  dateRange === range
                    ? "bg-navy-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "90d" ? "90 Days" : "Year"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="admin-input text-sm py-1.5 w-auto"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="admin-input text-sm py-1.5 w-auto"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="admin-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{kpi.title}</p>
                  <p className="text-2xl font-bold text-navy-800 mt-1">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight size={14} className="text-emerald-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-gray-400">vs last period</span>
                  </div>
                </div>
                <div className={`${kpi.color} p-2.5 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-6">Revenue & Booking Trends</h2>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3A5C" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1B3A5C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#1B3A5C", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
                formatter={(value: number, name: string) => [
                  name === "revenue" ? `INR ${value.toLocaleString()}` : value,
                  name === "revenue" ? "Revenue" : "Bookings",
                ]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#1B3A5C" strokeWidth={2} fill="url(#revenueGradient)" />
              <Line type="monotone" dataKey="bookings" stroke="#E8A317" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-6">Bookings by Type</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={bookingsByType}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {bookingsByType.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1B3A5C", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
                formatter={(value: number) => [`${value}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {bookingsByType.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-navy-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-navy-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-6">Daily Booking Pattern</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyBookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1B3A5C", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
              />
              <Bar dataKey="bookings" fill="#4A90D9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-6">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1B3A5C", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
              />
              <Line type="monotone" dataKey="users" stroke="#E8A317" strokeWidth={2.5} dot={{ r: 3, fill: "#E8A317" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="text-lg font-semibold text-navy-800 mb-4">Revenue by Category</h2>
        <div className="space-y-4">
          {revenueByCategory.map((cat) => (
            <div key={cat.category} className="flex items-center gap-4">
              <div className="w-28 text-sm font-medium text-navy-700">{cat.category}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-navy-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-32 text-right">
                <span className="text-sm font-medium text-navy-800">
                  INR {(cat.revenue / 100000).toFixed(1)}L
                </span>
                <span className="text-xs text-gray-400 ml-2">({cat.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

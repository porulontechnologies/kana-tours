"use client";

import { useEffect, useState } from "react";
import { Plane, Bus, Building2, Map, CalendarCheck, TrendingUp, Percent, IndianRupee } from "lucide-react";
import Link from "next/link";
import apiClient from "@/lib/api-client";

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  totalCommission: number;
  bookings: { bookingType: string; status: string; _count: { id: number }; _sum: { totalAmount: number } }[];
}

const bookingTypes = [
  { label: "Book Flight",       href: "/flights",  icon: Plane,      color: "bg-sky-100 text-sky-600",     desc: "Search & book airline tickets" },
  { label: "Book Bus",          href: "/buses",    icon: Bus,        color: "bg-emerald-100 text-emerald-600", desc: "Find & book bus tickets" },
  { label: "Book Hotel",        href: "/hotels",   icon: Building2,  color: "bg-purple-100 text-purple-600",  desc: "Search & reserve hotels" },
  { label: "Tour Package",      href: "/packages", icon: Map,        color: "bg-gold-100 text-gold-600",      desc: "Browse & book tour packages" },
];

export default function AgentDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [commissions, setCommissions] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get("/agents/me/stats").catch(() => null),
      apiClient.get("/agents/me/profile").catch(() => null),
    ]).then(([statsRes, profileRes]) => {
      if (statsRes?.data?.data) setStats(statsRes.data.data);
      if (profileRes?.data?.data) setCommissions(profileRes.data.data);
    }).finally(() => setLoading(false));
  }, []);

  const flightBookings = stats?.bookings.filter((b) => b.bookingType === "FLIGHT").reduce((s, b) => s + b._count.id, 0) ?? 0;
  const busBookings    = stats?.bookings.filter((b) => b.bookingType === "BUS").reduce((s, b) => s + b._count.id, 0) ?? 0;
  const hotelBookings  = stats?.bookings.filter((b) => b.bookingType === "HOTEL").reduce((s, b) => s + b._count.id, 0) ?? 0;
  const tourBookings   = stats?.bookings.filter((b) => b.bookingType === "TOUR_PACKAGE").reduce((s, b) => s + b._count.id, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Agent Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Start booking for your clients.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Bookings", value: stats?.totalBookings ?? 0, icon: CalendarCheck, color: "bg-navy-600", suffix: "" },
          { label: "Total Revenue", value: stats?.totalRevenue ?? 0, icon: IndianRupee, color: "bg-emerald-600", prefix: "₹" },
          { label: "Commission Earned", value: stats?.totalCommission ?? 0, icon: Percent, color: "bg-gold-500", prefix: "₹" },
          { label: "Active Rate", value: commissions ? `${commissions.flightCommission}–${commissions.tourCommission}` : "—", icon: TrendingUp, color: "bg-sky-600", suffix: "%" },
        ].map((s) => (
          <div key={s.label} className="agent-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-navy-800 mt-1">
                  {s.prefix}{typeof s.value === "number" ? s.value.toLocaleString("en-IN", { maximumFractionDigits: 0 }) : s.value}{s.suffix}
                </p>
              </div>
              <div className={`${s.color} p-2.5 rounded-lg`}>
                <s.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Book */}
      <div>
        <h2 className="text-lg font-semibold text-navy-800 mb-4">Quick Book</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookingTypes.map(({ label, href, icon: Icon, color, desc }) => (
            <Link key={href} href={href} className="agent-card hover:shadow-md transition-all duration-200 group cursor-pointer">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
              </div>
              <h3 className="font-semibold text-navy-800">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Booking breakdown + Commission rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="agent-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">My Bookings Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: "Flights", count: flightBookings, icon: Plane, color: "text-sky-600 bg-sky-50" },
              { label: "Buses", count: busBookings, icon: Bus, color: "text-emerald-600 bg-emerald-50" },
              { label: "Hotels", count: hotelBookings, icon: Building2, color: "text-purple-600 bg-purple-50" },
              { label: "Tours", count: tourBookings, icon: Map, color: "text-gold-600 bg-gold-50" },
            ].map(({ label, count, icon: Icon, color }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-navy-700">{label}</span>
                </div>
                <span className="text-sm font-bold text-navy-800">{count} bookings</span>
              </div>
            ))}
          </div>
        </div>

        <div className="agent-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">My Commission Rates</h2>
          {commissions ? (
            <div className="space-y-3">
              {[
                { label: "Flight Booking", rate: commissions.flightCommission, icon: Plane },
                { label: "Bus Booking",    rate: commissions.busCommission,    icon: Bus },
                { label: "Hotel Booking",  rate: commissions.hotelCommission,  icon: Building2 },
                { label: "Tour Package",   rate: commissions.tourCommission,   icon: Map },
              ].map(({ label, rate, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-navy-500" />
                    <span className="text-sm text-navy-700">{label}</span>
                  </div>
                  <span className="text-sm font-bold text-gold-600">{rate}%</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">Commission data loading...</div>
          )}
          <Link href="/commission" className="block mt-4 text-center text-xs text-navy-600 hover:text-navy-800 font-medium">
            View detailed commission report →
          </Link>
        </div>
      </div>
    </div>
  );
}

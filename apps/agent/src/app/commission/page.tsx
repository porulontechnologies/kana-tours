"use client";

import { useEffect, useState } from "react";
import { Percent, Plane, Bus, Building2, Map, IndianRupee, Loader2 } from "lucide-react";
import apiClient from "@/lib/api-client";

export default function AgentCommissionPage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get("/agents/me/profile").catch(() => null),
      apiClient.get("/agents/me/stats").catch(() => null),
    ]).then(([profileRes, statsRes]) => {
      setProfile(profileRes?.data?.data);
      setStats(statsRes?.data?.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-navy-600" />
      </div>
    );
  }

  const commissionItems = profile ? [
    { label: "Flight Booking", icon: Plane, rate: profile.flightCommission, color: "text-sky-600 bg-sky-50", type: "FLIGHT" },
    { label: "Bus Booking",    icon: Bus,   rate: profile.busCommission,    color: "text-emerald-600 bg-emerald-50", type: "BUS" },
    { label: "Hotel Booking",  icon: Building2, rate: profile.hotelCommission, color: "text-purple-600 bg-purple-50", type: "HOTEL" },
    { label: "Tour Package",   icon: Map,   rate: profile.tourCommission,   color: "text-gold-600 bg-gold-50", type: "TOUR_PACKAGE" },
  ] : [];

  const getTypeRevenue = (type: string) => {
    if (!stats?.bookings) return { count: 0, revenue: 0 };
    const matching = stats.bookings.filter((b: any) => b.bookingType === type && ["CONFIRMED", "COMPLETED"].includes(b.status));
    return {
      count: matching.reduce((s: number, b: any) => s + b._count.id, 0),
      revenue: matching.reduce((s: number, b: any) => s + (b._sum?.totalAmount || 0), 0),
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <Percent size={24} className="text-gold-600" /> My Commission
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your commission rates and earnings breakdown</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="agent-card text-center">
          <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <IndianRupee size={24} className="text-navy-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">
            ₹{(stats?.totalCommission ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Commission Earned</p>
        </div>
        <div className="agent-card text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <IndianRupee size={24} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">
            ₹{(stats?.totalRevenue ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Bookings Revenue</p>
        </div>
        <div className="agent-card text-center">
          <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Percent size={24} className="text-gold-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">{stats?.totalBookings ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Confirmed Bookings</p>
        </div>
      </div>

      {/* Rates & Earnings Breakdown */}
      <div className="agent-card">
        <h2 className="text-lg font-semibold text-navy-800 mb-5">Commission by Category</h2>
        <div className="space-y-4">
          {commissionItems.map(({ label, icon: Icon, rate, color, type }) => {
            const { count, revenue } = getTypeRevenue(type);
            const commission = (revenue * rate) / 100;
            return (
              <div key={type} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-navy-800">{label}</p>
                    <span className="text-xl font-bold text-gold-600">{rate}%</span>
                  </div>
                  <div className="flex items-center gap-6 mt-1 text-sm text-gray-500">
                    <span>{count} confirmed booking{count !== 1 ? "s" : ""}</span>
                    <span>Revenue: ₹{revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                    <span className="font-medium text-emerald-600">
                      Earned: ₹{commission.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Commission is calculated on confirmed and completed bookings only. Contact admin to update your commission rates.
        </p>
      </div>
    </div>
  );
}

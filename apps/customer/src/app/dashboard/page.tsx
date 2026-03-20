"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import apiClient from "@/lib/api-client";
import {
  CalendarCheck,
  MapPin,
  Clock,
  ArrowRight,
  Plane,
  Bus,
  Hotel,
  Package,
} from "lucide-react";

const bookingTypeIcons: Record<string, React.ElementType> = {
  TOUR_PACKAGE: Package,
  HOTEL: Hotel,
  FLIGHT: Plane,
  BUS: Bus,
};

const statusColors: Record<string, string> = {
  CONFIRMED: "badge-success",
  PENDING: "badge-warning",
  CANCELLED: "badge-error",
  COMPLETED: "badge-info",
};

export default function DashboardPage() {
  const { data: session } = useSession();

  const { data: bookingsData } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const { data } = await apiClient.get("/bookings/my");
      return data;
    },
    enabled: !!session,
  });

  const bookings = bookingsData?.data || [];
  const upcomingBookings = bookings
    .filter(
      (b: any) =>
        b.status === "CONFIRMED" && new Date(b.checkIn || b.createdAt) >= new Date()
    )
    .slice(0, 3);

  const recentBookings = bookings.slice(0, 5);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b: any) => b.status === "CONFIRMED").length,
    upcoming: upcomingBookings.length,
    spent: bookings
      .filter((b: any) => b.status === "CONFIRMED" || b.status === "COMPLETED")
      .reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">
          Welcome back, {session?.user?.name?.split(" ")[0]}!
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s a summary of your travel activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: stats.total, color: "bg-blue-50 text-blue-700" },
          { label: "Confirmed", value: stats.confirmed, color: "bg-green-50 text-green-700" },
          { label: "Upcoming Trips", value: stats.upcoming, color: "bg-purple-50 text-purple-700" },
          {
            label: "Total Spent",
            value: `₹${stats.spent.toLocaleString("en-IN")}`,
            color: "bg-amber-50 text-amber-700",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-4 ${stat.color}`}
          >
            <p className="text-xs font-medium opacity-75">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Trips */}
      {upcomingBookings.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy">Upcoming Trips</h2>
            <Link
              href="/dashboard/bookings"
              className="flex items-center gap-1 text-sm text-sky hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingBookings.map((booking: any) => {
              const Icon = bookingTypeIcons[booking.bookingType] || Package;
              return (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/10">
                    <Icon className="h-5 w-5 text-navy" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {booking.tourPackage?.name ||
                        booking.hotel?.name ||
                        `${booking.bookingType} Booking`}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {booking.checkIn && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(booking.checkIn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {booking.guestCount} traveler(s)
                      </span>
                    </div>
                  </div>
                  <span className={statusColors[booking.status] || "badge-info"}>
                    {booking.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Recent Bookings</h2>
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-1 text-sm text-sky hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="mt-8 text-center">
            <CalendarCheck className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-gray-500">No bookings yet</p>
            <Link href="/tours" className="btn-gold mt-4 inline-block">
              Explore Tours
            </Link>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 font-medium">Booking</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">
                      {booking.tourPackage?.name ||
                        booking.hotel?.name ||
                        booking.id.slice(0, 8)}
                    </td>
                    <td className="py-3 capitalize text-gray-600">
                      {booking.bookingType.replace("_", " ").toLowerCase()}
                    </td>
                    <td className="py-3 text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 font-medium text-gray-900">
                      ₹{booking.totalAmount?.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3">
                      <span className={statusColors[booking.status] || "badge-info"}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import apiClient from "@/lib/api-client";
import {
  CalendarCheck,
  Search,
  Filter,
  Eye,
  XCircle,
  Plane,
  Bus,
  Hotel,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const bookingTypeIcons: Record<string, React.ElementType> = {
  TOUR_PACKAGE: Package,
  HOTEL: Hotel,
  FLIGHT: Plane,
  BUS: Bus,
};

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  REFUNDED: "bg-purple-100 text-purple-800",
};

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const { data: bookingsData, isLoading, refetch } = useQuery({
    queryKey: ["my-bookings", page],
    queryFn: async () => {
      const { data } = await apiClient.get("/bookings/my", {
        params: { page, limit: 10 },
      });
      return data;
    },
    enabled: !!session,
  });

  const allBookings = bookingsData?.data || [];
  const meta = bookingsData?.meta;

  const filteredBookings = allBookings.filter((b: any) => {
    if (statusFilter !== "ALL" && b.status !== statusFilter) return false;
    if (typeFilter !== "ALL" && b.bookingType !== typeFilter) return false;
    return true;
  });

  async function handleCancel(bookingId: string) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await apiClient.post(`/bookings/${bookingId}/cancel`);
      refetch();
    } catch {
      alert("Failed to cancel booking");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">My Bookings</h1>
        <p className="mt-1 text-gray-600">View and manage all your bookings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="input-field w-auto text-sm"
        >
          <option value="ALL">All Types</option>
          <option value="TOUR_PACKAGE">Tours</option>
          <option value="HOTEL">Hotels</option>
          <option value="FLIGHT">Flights</option>
          <option value="BUS">Buses</option>
        </select>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-md">
          <CalendarCheck className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No bookings found
          </h3>
          <p className="mt-2 text-gray-500">
            {statusFilter !== "ALL" || typeFilter !== "ALL"
              ? "Try adjusting your filters"
              : "Start exploring and book your next adventure!"}
          </p>
          <Link href="/tours" className="btn-gold mt-6 inline-block">
            Explore Tours
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking: any) => {
            const Icon = bookingTypeIcons[booking.bookingType] || Package;
            return (
              <div
                key={booking.id}
                className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-navy/10">
                      <Icon className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {booking.tourPackage?.name ||
                          booking.hotel?.name ||
                          `${booking.bookingType.replace("_", " ")} Booking`}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Booking ID: {booking.id.slice(0, 12)}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span>
                          {booking.guestCount} traveler(s)
                        </span>
                        {booking.checkIn && (
                          <span>
                            Check-in:{" "}
                            {new Date(booking.checkIn).toLocaleDateString("en-IN")}
                          </span>
                        )}
                        <span>
                          Booked:{" "}
                          {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-navy">
                        ₹{booking.totalAmount?.toLocaleString("en-IN")}
                      </p>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[booking.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/booking/${booking.id}`}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Eye className="h-3 w-3" /> View
                      </Link>
                      {booking.status === "PENDING" ||
                      booking.status === "CONFIRMED" ? (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-3 w-3" /> Cancel
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!meta.hasPrev}
                className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {meta.page} of {meta.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!meta.hasNext}
                className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

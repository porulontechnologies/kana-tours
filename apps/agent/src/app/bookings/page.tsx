"use client";

import { useEffect, useState, useCallback } from "react";
import { CalendarCheck, Plane, Bus, Building2, Map, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import apiClient from "@/lib/api-client";
import toast from "react-hot-toast";

interface Booking {
  id: string;
  bookingType: string;
  status: string;
  totalAmount: number;
  currency: string;
  contactName: string;
  contactPhone: string;
  createdAt: string;
  hotel?: { name: string; city: string };
  tourPackage?: { name: string; destination: string };
}

const typeIcon = (type: string) => {
  switch (type) {
    case "FLIGHT": return <Plane size={14} className="text-sky-600" />;
    case "BUS":    return <Bus size={14} className="text-emerald-600" />;
    case "HOTEL":  return <Building2 size={14} className="text-purple-600" />;
    default:       return <Map size={14} className="text-gold-600" />;
  }
};

const typeLabel = (type: string) => {
  switch (type) {
    case "FLIGHT": return "Flight";
    case "BUS":    return "Bus";
    case "HOTEL":  return "Hotel";
    default:       return "Tour Package";
  }
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    CONFIRMED: "badge-success", COMPLETED: "badge-success",
    PENDING: "badge-warning", CANCELLED: "badge-danger", REFUNDED: "badge-neutral",
  };
  return <span className={map[status] ?? "badge-neutral"}>{status}</span>;
}

export default function AgentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 15 };
      if (typeFilter !== "all") params.bookingType = typeFilter;
      if (statusFilter !== "all") params.status = statusFilter;
      const res = await apiClient.get("/bookings", { params });
      setBookings(res.data.data || []);
      setTotalPages(res.data.meta?.totalPages || 1);
      setTotal(res.data.meta?.total || 0);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter, statusFilter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <CalendarCheck size={24} className="text-navy-600" /> My Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">All bookings made through your agent account</p>
      </div>

      <div className="agent-card">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="agent-select text-sm py-2 w-auto">
            <option value="all">All Types</option>
            <option value="FLIGHT">Flights</option>
            <option value="BUS">Buses</option>
            <option value="HOTEL">Hotels</option>
            <option value="TOUR_PACKAGE">Tour Packages</option>
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="agent-select text-sm py-2 w-auto">
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <p className="text-sm text-gray-500 ml-auto self-center">{total} total bookings</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-navy-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="agent-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Type</th>
                    <th>Client</th>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="font-mono text-xs text-navy-700">{b.id.slice(0, 8)}...</td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {typeIcon(b.bookingType)}
                          <span className="text-xs font-medium">{typeLabel(b.bookingType)}</span>
                        </div>
                      </td>
                      <td>
                        <p className="font-medium text-navy-800">{b.contactName}</p>
                        <p className="text-xs text-gray-500">{b.contactPhone}</p>
                      </td>
                      <td className="text-sm text-gray-600">
                        {b.hotel?.name || b.tourPackage?.name || "—"}
                        {b.hotel?.city && <span className="text-xs text-gray-400 ml-1">({b.hotel.city})</span>}
                        {b.tourPackage?.destination && <span className="text-xs text-gray-400 ml-1">({b.tourPackage.destination})</span>}
                      </td>
                      <td className="font-semibold text-navy-800">
                        ₹{b.totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td><StatusBadge status={b.status} /></td>
                      <td className="text-xs text-gray-500">
                        {new Date(b.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bookings.length === 0 && (
              <div className="text-center py-12 text-gray-400">No bookings found.</div>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-40">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

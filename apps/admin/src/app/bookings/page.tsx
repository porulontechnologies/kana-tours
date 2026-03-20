"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Calendar,
} from "lucide-react";

const sampleBookings = [
  {
    id: "BK-1001",
    customer: "Rajesh Kumar",
    email: "rajesh@email.com",
    type: "Tour Package",
    package: "Kashmir Paradise Tour",
    amount: 45000,
    status: "Confirmed",
    paymentStatus: "Paid",
    date: "2024-12-15",
    travelers: 2,
  },
  {
    id: "BK-1002",
    customer: "Priya Sharma",
    email: "priya@email.com",
    type: "Hotel",
    package: "The Grand Palace Hotel",
    amount: 12500,
    status: "Pending",
    paymentStatus: "Pending",
    date: "2024-12-14",
    travelers: 1,
  },
  {
    id: "BK-1003",
    customer: "Amit Patel",
    email: "amit@email.com",
    type: "Flight",
    package: "DEL-BOM AI302",
    amount: 8200,
    status: "Confirmed",
    paymentStatus: "Paid",
    date: "2024-12-14",
    travelers: 1,
  },
  {
    id: "BK-1004",
    customer: "Sneha Reddy",
    email: "sneha@email.com",
    type: "Tour Package",
    package: "Kerala Backwaters Explorer",
    amount: 32000,
    status: "Cancelled",
    paymentStatus: "Refunded",
    date: "2024-12-13",
    travelers: 4,
  },
  {
    id: "BK-1005",
    customer: "Vikram Singh",
    email: "vikram@email.com",
    type: "Bus",
    package: "Jaipur - Udaipur Express",
    amount: 1800,
    status: "Confirmed",
    paymentStatus: "Paid",
    date: "2024-12-13",
    travelers: 2,
  },
  {
    id: "BK-1006",
    customer: "Ananya Gupta",
    email: "ananya@email.com",
    type: "Tour Package",
    package: "Royal Rajasthan Circuit",
    amount: 55000,
    status: "Confirmed",
    paymentStatus: "Paid",
    date: "2024-12-12",
    travelers: 3,
  },
  {
    id: "BK-1007",
    customer: "Rohit Mehra",
    email: "rohit@email.com",
    type: "Hotel",
    package: "Oceanview Beach Resort",
    amount: 18600,
    status: "Pending",
    paymentStatus: "Partial",
    date: "2024-12-11",
    travelers: 2,
  },
  {
    id: "BK-1008",
    customer: "Kavita Nair",
    email: "kavita@email.com",
    type: "Flight",
    package: "BLR-CCU 6E245",
    amount: 6500,
    status: "Confirmed",
    paymentStatus: "Paid",
    date: "2024-12-11",
    travelers: 1,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Confirmed": return "badge-success";
    case "Pending": return "badge-warning";
    case "Cancelled": return "badge-danger";
    default: return "badge-neutral";
  }
}

function getPaymentBadge(status: string) {
  switch (status) {
    case "Paid": return "badge-success";
    case "Pending": return "badge-warning";
    case "Partial": return "badge-info";
    case "Refunded": return "badge-neutral";
    default: return "badge-neutral";
  }
}

function getTypeBadge(type: string) {
  switch (type) {
    case "Tour Package": return "bg-purple-50 text-purple-700";
    case "Hotel": return "bg-sky-50 text-sky-700";
    case "Flight": return "bg-blue-50 text-blue-700";
    case "Bus": return "bg-amber-50 text-amber-700";
    default: return "badge-neutral";
  }
}

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredBookings = sampleBookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesType = typeFilter === "all" || booking.type === typeFilter;
    const matchesDateFrom = !dateFrom || booking.date >= dateFrom;
    const matchesDateTo = !dateTo || booking.date <= dateTo;
    return matchesSearch && matchesStatus && matchesType && matchesDateFrom && matchesDateTo;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">All Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all bookings ({sampleBookings.length} total)
          </p>
        </div>
        <button className="admin-btn-secondary flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="admin-card">
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, customer, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-input pl-9 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-select text-sm py-2 w-auto">
                <option value="all">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="admin-select text-sm py-2 w-auto">
                <option value="all">All Types</option>
                <option value="Tour Package">Tour Package</option>
                <option value="Hotel">Hotel</option>
                <option value="Flight">Flight</option>
                <option value="Bus">Bus</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="admin-input text-sm py-1.5 w-auto"
              placeholder="From"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="admin-input text-sm py-1.5 w-auto"
              placeholder="To"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Details</th>
                <th>Travelers</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-medium text-navy-700">{booking.id}</td>
                  <td>
                    <div>
                      <p className="font-medium text-navy-800">{booking.customer}</p>
                      <p className="text-xs text-gray-400">{booking.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getTypeBadge(booking.type)}`}>{booking.type}</span>
                  </td>
                  <td className="max-w-[200px] truncate">{booking.package}</td>
                  <td className="text-center">{booking.travelers}</td>
                  <td className="font-medium">INR {booking.amount.toLocaleString()}</td>
                  <td>
                    <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                  </td>
                  <td>
                    <span className={getPaymentBadge(booking.paymentStatus)}>{booking.paymentStatus}</span>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap">{booking.date}</td>
                  <td>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-600 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found matching your criteria.</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {filteredBookings.length} of {sampleBookings.length} bookings
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
            <button className="px-3 py-1.5 rounded-lg bg-navy-600 text-white text-sm font-medium">1</button>
            <button className="px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm transition-colors">2</button>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

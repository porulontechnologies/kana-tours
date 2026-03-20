"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plane,
  Download,
} from "lucide-react";

const sampleFlightBookings = [
  {
    id: "FB-2001",
    pnr: "ABC123",
    customer: "Amit Patel",
    email: "amit@email.com",
    airline: "Air India",
    flightNo: "AI302",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    departureDate: "2024-12-20",
    departureTime: "08:30",
    arrivalTime: "10:45",
    passengers: [
      { name: "Amit Patel", age: 32, seat: "12A" },
    ],
    class: "Economy",
    amount: 8200,
    status: "Confirmed",
    bookedOn: "2024-12-14",
  },
  {
    id: "FB-2002",
    pnr: "DEF456",
    customer: "Kavita Nair",
    email: "kavita@email.com",
    airline: "IndiGo",
    flightNo: "6E245",
    from: "Bangalore (BLR)",
    to: "Kolkata (CCU)",
    departureDate: "2024-12-22",
    departureTime: "14:15",
    arrivalTime: "17:00",
    passengers: [
      { name: "Kavita Nair", age: 28, seat: "8C" },
    ],
    class: "Economy",
    amount: 6500,
    status: "Confirmed",
    bookedOn: "2024-12-11",
  },
  {
    id: "FB-2003",
    pnr: "GHI789",
    customer: "Suresh Menon",
    email: "suresh@email.com",
    airline: "Vistara",
    flightNo: "UK845",
    from: "Mumbai (BOM)",
    to: "Chennai (MAA)",
    departureDate: "2024-12-25",
    departureTime: "10:00",
    arrivalTime: "12:10",
    passengers: [
      { name: "Suresh Menon", age: 45, seat: "3A" },
      { name: "Lakshmi Menon", age: 42, seat: "3B" },
    ],
    class: "Business",
    amount: 24000,
    status: "Confirmed",
    bookedOn: "2024-12-10",
  },
  {
    id: "FB-2004",
    pnr: "JKL012",
    customer: "Neha Kapoor",
    email: "neha@email.com",
    airline: "SpiceJet",
    flightNo: "SG142",
    from: "Delhi (DEL)",
    to: "Goa (GOI)",
    departureDate: "2024-12-28",
    departureTime: "06:45",
    arrivalTime: "09:30",
    passengers: [
      { name: "Neha Kapoor", age: 30, seat: "15D" },
      { name: "Rahul Kapoor", age: 33, seat: "15E" },
    ],
    class: "Economy",
    amount: 11400,
    status: "Pending",
    bookedOn: "2024-12-13",
  },
  {
    id: "FB-2005",
    pnr: "MNO345",
    customer: "Arun Joshi",
    email: "arun@email.com",
    airline: "Air India",
    flightNo: "AI505",
    from: "Kolkata (CCU)",
    to: "Delhi (DEL)",
    departureDate: "2024-12-18",
    departureTime: "16:30",
    arrivalTime: "19:00",
    passengers: [
      { name: "Arun Joshi", age: 55, seat: "6F" },
    ],
    class: "Economy",
    amount: 7800,
    status: "Cancelled",
    bookedOn: "2024-12-08",
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

export default function FlightBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredBookings = sampleFlightBookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.pnr.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.toLowerCase().includes(search.toLowerCase()) ||
      booking.flightNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-lg">
            <Plane size={22} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-800">Flight Bookings</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {sampleFlightBookings.length} total flight bookings
            </p>
          </div>
        </div>
        <button className="admin-btn-secondary flex items-center gap-2">
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="admin-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, PNR, customer, or flight..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 py-2 text-sm"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-select text-sm py-2 w-auto">
            <option value="all">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>PNR</th>
                <th>Customer</th>
                <th>Flight</th>
                <th>Route</th>
                <th>Date</th>
                <th>Time</th>
                <th>Class</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <>
                  <tr key={booking.id}>
                    <td className="font-medium text-navy-700">{booking.id}</td>
                    <td>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">{booking.pnr}</span>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-navy-800">{booking.customer}</p>
                        <p className="text-xs text-gray-400">{booking.email}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-navy-700">{booking.flightNo}</p>
                        <p className="text-xs text-gray-400">{booking.airline}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{booking.from.split("(")[0].trim()}</span>
                        <Plane size={12} className="text-gray-400" />
                        <span className="text-sm">{booking.to.split("(")[0].trim()}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-gray-500">{booking.departureDate}</td>
                    <td className="whitespace-nowrap">
                      <p className="text-sm">{booking.departureTime}</p>
                      <p className="text-xs text-gray-400">{booking.arrivalTime}</p>
                    </td>
                    <td>
                      <span className={`badge ${booking.class === "Business" ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                        {booking.class}
                      </span>
                    </td>
                    <td className="font-medium">INR {booking.amount.toLocaleString()}</td>
                    <td>
                      <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => setExpandedRow(expandedRow === booking.id ? null : booking.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-600 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === booking.id && (
                    <tr key={`${booking.id}-detail`}>
                      <td colSpan={11} className="bg-gray-50 px-6 py-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-navy-700">Passenger Details</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {booking.passengers.map((p, i) => (
                              <div key={i} className="bg-white rounded-lg border border-gray-200 p-3">
                                <p className="font-medium text-navy-800 text-sm">{p.name}</p>
                                <p className="text-xs text-gray-500">Age: {p.age} | Seat: {p.seat}</p>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400">Booked on: {booking.bookedOn}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No flight bookings found.</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing {filteredBookings.length} flight bookings</p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><ChevronLeft size={16} /></button>
            <button className="px-3 py-1.5 rounded-lg bg-navy-600 text-white text-sm font-medium">1</button>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

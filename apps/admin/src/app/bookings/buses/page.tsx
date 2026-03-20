"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Bus,
  Download,
} from "lucide-react";

const sampleBusBookings = [
  {
    id: "BB-3001",
    customer: "Vikram Singh",
    email: "vikram@email.com",
    operator: "RSRTC",
    busType: "AC Sleeper",
    from: "Jaipur",
    to: "Udaipur",
    departureDate: "2024-12-20",
    departureTime: "21:00",
    arrivalTime: "05:30",
    seats: ["L12", "L13"],
    boardingPoint: "Sindhi Camp Bus Stand",
    droppingPoint: "Udaipur Bus Stand",
    amount: 1800,
    status: "Confirmed",
    bookedOn: "2024-12-13",
  },
  {
    id: "BB-3002",
    customer: "Deepa Iyer",
    email: "deepa@email.com",
    operator: "KSRTC",
    busType: "AC Semi-Sleeper",
    from: "Bangalore",
    to: "Mysore",
    departureDate: "2024-12-18",
    departureTime: "07:00",
    arrivalTime: "10:30",
    seats: ["S5"],
    boardingPoint: "Majestic Bus Station",
    droppingPoint: "Mysore Central",
    amount: 650,
    status: "Confirmed",
    bookedOn: "2024-12-12",
  },
  {
    id: "BB-3003",
    customer: "Ravi Teja",
    email: "ravi@email.com",
    operator: "VRL Travels",
    busType: "Multi-Axle Volvo",
    from: "Hyderabad",
    to: "Mumbai",
    departureDate: "2024-12-22",
    departureTime: "18:30",
    arrivalTime: "06:00",
    seats: ["U8", "U9", "U10"],
    boardingPoint: "Ameerpet",
    droppingPoint: "Dadar TT",
    amount: 4500,
    status: "Pending",
    bookedOn: "2024-12-14",
  },
  {
    id: "BB-3004",
    customer: "Pooja Deshmukh",
    email: "pooja@email.com",
    operator: "MSRTC",
    busType: "Non-AC Sleeper",
    from: "Pune",
    to: "Nagpur",
    departureDate: "2024-12-19",
    departureTime: "20:00",
    arrivalTime: "08:00",
    seats: ["L4"],
    boardingPoint: "Shivaji Nagar Bus Stand",
    droppingPoint: "Nagpur Bus Stand",
    amount: 950,
    status: "Cancelled",
    bookedOn: "2024-12-10",
  },
  {
    id: "BB-3005",
    customer: "Manish Agarwal",
    email: "manish@email.com",
    operator: "Orange Tours",
    busType: "AC Sleeper",
    from: "Indore",
    to: "Bhopal",
    departureDate: "2024-12-21",
    departureTime: "23:00",
    arrivalTime: "04:30",
    seats: ["L1", "L2"],
    boardingPoint: "Sarwate Bus Stand",
    droppingPoint: "ISBT Bhopal",
    amount: 1200,
    status: "Confirmed",
    bookedOn: "2024-12-15",
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

export default function BusBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredBookings = sampleBusBookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.toLowerCase().includes(search.toLowerCase()) ||
      booking.from.toLowerCase().includes(search.toLowerCase()) ||
      booking.to.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-lg">
            <Bus size={22} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-800">Bus Bookings</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {sampleBusBookings.length} total bus bookings
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
              placeholder="Search by ID, customer, or route..."
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
                <th>Customer</th>
                <th>Operator</th>
                <th>Bus Type</th>
                <th>Route</th>
                <th>Date</th>
                <th>Seats</th>
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
                      <div>
                        <p className="font-medium text-navy-800">{booking.customer}</p>
                        <p className="text-xs text-gray-400">{booking.email}</p>
                      </div>
                    </td>
                    <td>{booking.operator}</td>
                    <td>
                      <span className="badge bg-gray-100 text-gray-700">{booking.busType}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{booking.from}</span>
                        <Bus size={12} className="text-gray-400" />
                        <span className="text-sm">{booking.to}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <p className="text-sm">{booking.departureDate}</p>
                      <p className="text-xs text-gray-400">{booking.departureTime} - {booking.arrivalTime}</p>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {booking.seats.map((seat) => (
                          <span key={seat} className="text-xs bg-navy-50 text-navy-700 px-1.5 py-0.5 rounded font-mono">
                            {seat}
                          </span>
                        ))}
                      </div>
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
                      <td colSpan={10} className="bg-gray-50 px-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-navy-700 mb-2">Boarding Details</h4>
                            <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-1">
                              <p className="text-sm"><span className="text-gray-500">Boarding:</span> {booking.boardingPoint}</p>
                              <p className="text-sm"><span className="text-gray-500">Dropping:</span> {booking.droppingPoint}</p>
                              <p className="text-sm"><span className="text-gray-500">Departure:</span> {booking.departureTime}</p>
                              <p className="text-sm"><span className="text-gray-500">Arrival:</span> {booking.arrivalTime}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-navy-700 mb-2">Booking Info</h4>
                            <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-1">
                              <p className="text-sm"><span className="text-gray-500">Operator:</span> {booking.operator}</p>
                              <p className="text-sm"><span className="text-gray-500">Type:</span> {booking.busType}</p>
                              <p className="text-sm"><span className="text-gray-500">Seats:</span> {booking.seats.join(", ")}</p>
                              <p className="text-sm"><span className="text-gray-500">Booked on:</span> {booking.bookedOn}</p>
                            </div>
                          </div>
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
            <p className="text-gray-500">No bus bookings found.</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing {filteredBookings.length} bus bookings</p>
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

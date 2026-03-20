"use client";

import { useEffect, useState } from "react";
import { Map, Search, Loader2, Clock, Users, ArrowRight, Star } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface Package {
  id: string;
  name: string;
  slug: string;
  destination: string;
  duration: number;
  nights: number;
  price: number;
  discountedPrice?: number;
  maxGroupSize: number;
  images: string[];
  category: string;
  inclusions: string[];
  startDates: string[];
}

export default function AgentPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Package | null>(null);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({
    contactName: "", contactEmail: "", contactPhone: "",
    startDate: "", guestCount: 2, specialRequests: "",
  });

  useEffect(() => {
    apiClient.get("/packages", { params: { limit: 50 } })
      .then((res) => setPackages(res.data.data || []))
      .catch(() => toast.error("Failed to load packages"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = packages.filter((p) =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.destination?.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setBooking(true);
    try {
      await apiClient.post("/bookings", {
        bookingType: "TOUR_PACKAGE",
        tourPackageId: selected.id,
        totalAmount: (selected.discountedPrice ?? selected.price) * form.guestCount,
        currency: "INR",
        contactName: form.contactName,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        guestCount: form.guestCount,
        specialRequests: form.specialRequests,
        passengerDetails: { startDate: form.startDate, package: selected },
      });
      toast.success("Tour package booked successfully!");
      setSelected(null);
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const price = selected ? (selected.discountedPrice ?? selected.price) : 0;
  const total = price * form.guestCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <Map size={24} className="text-gold-600" /> Tour Packages
        </h1>
        <p className="text-sm text-gray-500 mt-1">Browse and book tour packages for your clients</p>
      </div>

      <div className="agent-card">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name or destination..."
              value={search} onChange={(e) => setSearch(e.target.value)} className="agent-input pl-9" />
          </div>
          <p className="text-sm text-gray-500">{filtered.length} packages</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-navy-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pkg) => (
            <div key={pkg.id} className="agent-card hover:shadow-md transition-shadow flex flex-col">
              {pkg.images?.[0] && (
                <img src={pkg.images[0]} alt={pkg.name} className="w-full h-44 object-cover rounded-lg mb-4" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="badge-info text-xs">{pkg.category}</span>
                  {pkg.discountedPrice && (
                    <span className="badge-success text-xs">
                      {Math.round((1 - pkg.discountedPrice / pkg.price) * 100)}% OFF
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-navy-800 mt-2">{pkg.name}</h3>
                <p className="text-sm text-gold-600 font-medium">{pkg.destination}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={13} />{pkg.duration}D/{pkg.nights}N</span>
                  <span className="flex items-center gap-1"><Users size={13} />Max {pkg.maxGroupSize}</span>
                </div>
                {pkg.inclusions?.slice(0, 2).length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {pkg.inclusions.slice(0, 2).map((inc) => (
                      <li key={inc} className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-emerald-500">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div>
                  {pkg.discountedPrice ? (
                    <>
                      <p className="text-xs text-gray-400 line-through">₹{pkg.price.toLocaleString("en-IN")}</p>
                      <p className="text-lg font-bold text-navy-800">₹{pkg.discountedPrice.toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-500">/person</span></p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-navy-800">₹{pkg.price.toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-500">/person</span></p>
                  )}
                </div>
                <button onClick={() => setSelected(pkg)} className="agent-btn-gold flex items-center gap-1">
                  Book <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg my-4">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy-800">Book — {selected.name}</h2>
              <p className="text-sm text-gray-500">{selected.destination} • {selected.duration}D/{selected.nights}N</p>
              {total > 0 && (
                <p className="text-sm font-bold text-navy-700 mt-1">
                  Total: ₹{total.toLocaleString("en-IN")} ({form.guestCount} person{form.guestCount > 1 ? "s" : ""})
                </p>
              )}
            </div>
            <form onSubmit={handleBook} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {selected.startDates?.length > 0 && (
                <div>
                  <label className="agent-label">Select Start Date</label>
                  <select value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="agent-select" required>
                    <option value="">Select a date</option>
                    {selected.startDates.map((d) => (
                      <option key={d} value={d}>{new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" })}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="agent-label">Number of Guests</label>
                  <input type="number" min={1} max={selected.maxGroupSize} value={form.guestCount}
                    onChange={(e) => setForm({ ...form, guestCount: parseInt(e.target.value) })}
                    className="agent-input" required />
                </div>
                <div>
                  <label className="agent-label">Contact Name *</label>
                  <input type="text" value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="agent-input" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="agent-label">Email *</label>
                  <input type="email" value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className="agent-input" required />
                </div>
                <div>
                  <label className="agent-label">Phone *</label>
                  <input type="tel" value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="agent-input" required />
                </div>
              </div>
              <div>
                <label className="agent-label">Special Requests</label>
                <textarea value={form.specialRequests}
                  onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                  placeholder="Any special requirements..." rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg resize-none text-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setSelected(null)} className="agent-btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={booking} className="agent-btn-gold flex-1 flex items-center justify-center gap-2">
                  {booking ? <Loader2 size={16} className="animate-spin" /> : <Map size={16} />}
                  {booking ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

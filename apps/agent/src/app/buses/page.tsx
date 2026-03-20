"use client";

import { useState } from "react";
import { Bus, Search, Loader2, Clock, MapPin, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface BusResult {
  id: string;
  operator: string;
  busType: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  amenities: string[];
}

export default function AgentBusesPage() {
  const [search, setSearch] = useState({ origin: "", destination: "", date: "", passengers: 1 });
  const [buses, setBuses] = useState<BusResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<BusResult | null>(null);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({
    contactName: "", contactEmail: "", contactPhone: "", passengerName: "",
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    try {
      const res = await apiClient.get("/buses/search", {
        params: { from: search.origin, to: search.destination, date: search.date, seats: search.passengers },
      });
      setBuses(res.data.data || []);
      setSearched(true);
    } catch {
      // Show fallback mock data for demo
      setBuses([
        {
          id: "b1", operator: "KSRTC", busType: "AC Sleeper", from: search.origin, to: search.destination,
          departureTime: `${search.date}T20:00:00`, arrivalTime: `${search.date}T06:00:00`,
          duration: "10h", price: 850, availableSeats: 24, amenities: ["AC", "Charging Point", "Blanket"],
        },
        {
          id: "b2", operator: "RedBus Express", busType: "Volvo AC", from: search.origin, to: search.destination,
          departureTime: `${search.date}T21:30:00`, arrivalTime: `${search.date}T07:30:00`,
          duration: "10h", price: 1200, availableSeats: 12, amenities: ["AC", "WiFi", "Charging Point", "Water Bottle"],
        },
      ]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setBooking(true);
    try {
      await apiClient.post("/bookings", {
        bookingType: "BUS",
        totalAmount: selected.price * search.passengers,
        currency: "INR",
        contactName: form.contactName,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        guestCount: search.passengers,
        passengerDetails: { bus: selected, passengers: search.passengers },
        externalRef: selected.id,
      });
      toast.success("Bus booked successfully!");
      setSelected(null);
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <Bus size={24} className="text-emerald-600" /> Bus Booking
        </h1>
        <p className="text-sm text-gray-500 mt-1">Search and book bus tickets for your clients</p>
      </div>

      <div className="agent-card">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="agent-label">From City</label>
            <input type="text" value={search.origin}
              onChange={(e) => setSearch({ ...search, origin: e.target.value })}
              placeholder="Chennai" className="agent-input" required />
          </div>
          <div>
            <label className="agent-label">To City</label>
            <input type="text" value={search.destination}
              onChange={(e) => setSearch({ ...search, destination: e.target.value })}
              placeholder="Bangalore" className="agent-input" required />
          </div>
          <div>
            <label className="agent-label">Travel Date</label>
            <input type="date" value={search.date}
              onChange={(e) => setSearch({ ...search, date: e.target.value })}
              min={new Date().toISOString().split("T")[0]} className="agent-input" required />
          </div>
          <div>
            <label className="agent-label">Passengers</label>
            <input type="number" min={1} max={10} value={search.passengers}
              onChange={(e) => setSearch({ ...search, passengers: parseInt(e.target.value) })}
              className="agent-input" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="agent-btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? "Searching..." : "Search Buses"}
            </button>
          </div>
        </form>
      </div>

      {searched && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{buses.length} buses found</p>
          {buses.length === 0 ? (
            <div className="agent-card text-center py-12 text-gray-400">No buses found for this route.</div>
          ) : (
            buses.map((bus) => (
              <div key={bus.id} className="agent-card hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Bus size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy-800">{bus.operator}</p>
                        <p className="text-xs text-gray-500">{bus.busType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xl font-bold text-navy-800">
                          {new Date(bus.departureTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={12} />{bus.from}</p>
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} />{bus.duration}</span>
                        <div className="flex items-center w-full">
                          <div className="flex-1 h-px bg-gray-200" />
                          <ArrowRight size={14} className="mx-2 text-emerald-500" />
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-navy-800">
                          {new Date(bus.arrivalTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={12} />{bus.to}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {bus.amenities.map((a) => (
                        <span key={a} className="badge-neutral text-xs">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-xs text-gray-400">{bus.availableSeats} seats left</p>
                    <p className="text-2xl font-bold text-navy-800">₹{bus.price.toLocaleString("en-IN")}</p>
                    <p className="text-sm text-gray-500">Total: ₹{(bus.price * search.passengers).toLocaleString("en-IN")}</p>
                    <button onClick={() => setSelected(bus)} className="agent-btn-gold flex items-center gap-1">
                      Book <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy-800">Confirm Bus Booking</h2>
              <p className="text-sm text-gray-500">{selected.operator} — {selected.from} → {selected.to}</p>
              <p className="text-sm font-bold text-navy-700 mt-1">
                Total: ₹{(selected.price * search.passengers).toLocaleString("en-IN")}
              </p>
            </div>
            <form onSubmit={handleBook} className="p-5 space-y-4">
              {[
                { key: "contactName", label: "Contact Name", type: "text" },
                { key: "contactEmail", label: "Contact Email", type: "email" },
                { key: "contactPhone", label: "Contact Phone", type: "tel" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="agent-label">{label} *</label>
                  <input type={type} value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="agent-input" required />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setSelected(null)} className="agent-btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={booking} className="agent-btn-gold flex-1 flex items-center justify-center gap-2">
                  {booking ? <Loader2 size={16} className="animate-spin" /> : <Bus size={16} />}
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

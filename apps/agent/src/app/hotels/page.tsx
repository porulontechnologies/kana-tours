"use client";

import { useEffect, useState } from "react";
import { Building2, Search, Star, Loader2, MapPin, ArrowRight, Wifi } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  starRating: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  rooms: { id: string; type: string; pricePerNight: number; capacity: number }[];
}

export default function AgentHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [selected, setSelected] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({
    contactName: "", contactEmail: "", contactPhone: "",
    checkIn: "", checkOut: "", guestCount: 2, specialRequests: "",
  });

  useEffect(() => {
    apiClient.get("/hotels", { params: { limit: 50 } })
      .then((res) => setHotels(res.data.data || []))
      .catch(() => toast.error("Failed to load hotels"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = hotels.filter((h) =>
    !cityFilter || h.city?.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const openBook = (hotel: Hotel) => {
    setSelected(hotel);
    setSelectedRoom(hotel.rooms?.[0]?.id || "");
  };

  const nights = form.checkIn && form.checkOut
    ? Math.max(1, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000))
    : 1;

  const selectedRoomObj = selected?.rooms?.find((r) => r.id === selectedRoom);
  const totalAmount = (selectedRoomObj?.pricePerNight ?? selected?.pricePerNight ?? 0) * nights;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setBooking(true);
    try {
      await apiClient.post("/bookings", {
        bookingType: "HOTEL",
        hotelId: selected.id,
        roomId: selectedRoom || undefined,
        totalAmount,
        currency: "INR",
        contactName: form.contactName,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        checkIn: new Date(form.checkIn).toISOString(),
        checkOut: new Date(form.checkOut).toISOString(),
        guestCount: form.guestCount,
        specialRequests: form.specialRequests,
      });
      toast.success("Hotel booked successfully!");
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
          <Building2 size={24} className="text-purple-600" /> Hotel Booking
        </h1>
        <p className="text-sm text-gray-500 mt-1">Browse and book hotels for your clients</p>
      </div>

      <div className="agent-card">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Filter by city..." value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)} className="agent-input pl-9" />
          </div>
          <p className="text-sm text-gray-500">{filtered.length} hotels available</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-navy-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((hotel) => (
            <div key={hotel.id} className="agent-card hover:shadow-md transition-shadow flex flex-col">
              {hotel.images?.[0] && (
                <img src={hotel.images[0]} alt={hotel.name}
                  className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-navy-800">{hotel.name}</h3>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {hotel.city}
                </p>
                {hotel.amenities?.slice(0, 3).length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {hotel.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="badge-neutral text-xs">{a}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400">Starting from</p>
                  <p className="text-lg font-bold text-navy-800">₹{hotel.pricePerNight?.toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-500">/night</span></p>
                </div>
                <button onClick={() => openBook(hotel)} className="agent-btn-gold flex items-center gap-1">
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
              <p className="text-sm text-gray-500">{selected.city}</p>
              {totalAmount > 0 && (
                <p className="text-sm font-bold text-navy-700 mt-1">Total: ₹{totalAmount.toLocaleString("en-IN")} ({nights} night{nights > 1 ? "s" : ""})</p>
              )}
            </div>
            <form onSubmit={handleBook} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {selected.rooms?.length > 0 && (
                <div>
                  <label className="agent-label">Select Room Type</label>
                  <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="agent-select">
                    {selected.rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.type} — ₹{r.pricePerNight}/night (capacity: {r.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="agent-label">Check-in *</label>
                  <input type="date" value={form.checkIn}
                    onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                    min={new Date().toISOString().split("T")[0]} className="agent-input" required />
                </div>
                <div>
                  <label className="agent-label">Check-out *</label>
                  <input type="date" value={form.checkOut}
                    onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                    min={form.checkIn || new Date().toISOString().split("T")[0]} className="agent-input" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="agent-label">Contact Name *</label>
                  <input type="text" value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="agent-input" required />
                </div>
                <div>
                  <label className="agent-label">Guests</label>
                  <input type="number" min={1} max={10} value={form.guestCount}
                    onChange={(e) => setForm({ ...form, guestCount: parseInt(e.target.value) })}
                    className="agent-input" />
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg agent-input resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setSelected(null)} className="agent-btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={booking} className="agent-btn-gold flex-1 flex items-center justify-center gap-2">
                  {booking ? <Loader2 size={16} className="animate-spin" /> : <Building2 size={16} />}
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

"use client";

import { useState } from "react";
import { Plane, Search, Loader2, ArrowRight, Clock, Users } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import AirportSearch from "@/components/AirportSearch";

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { airport: string; terminal?: string; time: string };
  arrival: { airport: string; terminal?: string; time: string };
  duration: string;
  stops: number;
  price: { amount: number; currency: string };
  seatsAvailable: number;
  segments: any[];
}

interface BookingForm {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  passengers: { name: string; age: number; gender: string }[];
}

function formatDuration(dur: string) {
  const match = dur.match(/PT(\d+H)?(\d+M)?/);
  const h = match?.[1] ? parseInt(match[1]) : 0;
  const m = match?.[2] ? parseInt(match[2]) : 0;
  return `${h}h ${m}m`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function AgentFlightsPage() {
  const [search, setSearch] = useState({
    origin: "", destination: "", departureDate: "", adults: 1, travelClass: "ECONOMY",
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<Flight | null>(null);
  const [booking, setBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    contactName: "", contactEmail: "", contactPhone: "",
    passengers: [{ name: "", age: 30, gender: "male" }],
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.origin || !search.destination) {
      toast.error("Please select both origin and destination airports");
      return;
    }
    setLoading(true);
    setSearched(false);
    try {
      const res = await apiClient.post("/flights/search", search);
      setFlights(res.data.data || []);
      setSearched(true);
    } catch {
      toast.error("Flight search failed");
    } finally {
      setLoading(false);
    }
  };

  const updatePassenger = (idx: number, field: string, value: any) => {
    const updated = [...bookingForm.passengers];
    updated[idx] = { ...updated[idx], [field]: value };
    setBookingForm({ ...bookingForm, passengers: updated });
  };

  const addPassenger = () => {
    if (bookingForm.passengers.length >= search.adults) return;
    setBookingForm({ ...bookingForm, passengers: [...bookingForm.passengers, { name: "", age: 30, gender: "male" }] });
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setBooking(true);
    try {
      await apiClient.post("/bookings", {
        bookingType: "FLIGHT",
        totalAmount: selected.price.amount * search.adults,
        currency: selected.price.currency,
        contactName: bookingForm.contactName,
        contactEmail: bookingForm.contactEmail,
        contactPhone: bookingForm.contactPhone,
        guestCount: search.adults,
        passengerDetails: {
          flight: selected,
          passengers: bookingForm.passengers,
          class: search.travelClass,
        },
        externalRef: `${selected.airline}-${selected.flightNumber}`,
      });
      toast.success("Flight booked successfully!");
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
          <Plane size={24} className="text-sky-600" /> Flight Booking
        </h1>
        <p className="text-sm text-gray-500 mt-1">Search and book flights for your clients</p>
      </div>

      {/* Search Form */}
      <div className="agent-card">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-1">
            <AirportSearch
              label="From"
              placeholder="City or airport"
              value={search.origin}
              onChange={(iata) => setSearch({ ...search, origin: iata })}
            />
          </div>
          <div className="lg:col-span-1">
            <AirportSearch
              label="To"
              placeholder="City or airport"
              value={search.destination}
              onChange={(iata) => setSearch({ ...search, destination: iata })}
            />
          </div>
          <div className="lg:col-span-1">
            <label className="agent-label">Date</label>
            <input type="date" value={search.departureDate}
              onChange={(e) => setSearch({ ...search, departureDate: e.target.value })}
              min={new Date().toISOString().split("T")[0]} className="agent-input" required />
          </div>
          <div>
            <label className="agent-label">Passengers</label>
            <input type="number" min={1} max={9} value={search.adults}
              onChange={(e) => setSearch({ ...search, adults: parseInt(e.target.value) })}
              className="agent-input" />
          </div>
          <div>
            <label className="agent-label">Class</label>
            <select value={search.travelClass} onChange={(e) => setSearch({ ...search, travelClass: e.target.value })}
              className="agent-select">
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM_ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="agent-btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{flights.length} flights found</p>
          {flights.length === 0 ? (
            <div className="agent-card text-center py-12 text-gray-400">No flights found for the selected route and date.</div>
          ) : (
            flights.map((flight) => (
              <div key={flight.id} className="agent-card hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-navy-800">{formatTime(flight.departure.time)}</p>
                      <p className="text-sm font-medium text-navy-600">{flight.departure.airport}</p>
                      {flight.departure.terminal && <p className="text-xs text-gray-400">T{flight.departure.terminal}</p>}
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={12} /> {formatDuration(flight.duration)}
                      </div>
                      <div className="flex items-center w-full">
                        <div className="flex-1 h-px bg-gray-200" />
                        <Plane size={14} className="mx-2 text-sky-500" />
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                      <p className="text-xs text-gray-400">{flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-navy-800">{formatTime(flight.arrival.time)}</p>
                      <p className="text-sm font-medium text-navy-600">{flight.arrival.airport}</p>
                      {flight.arrival.terminal && <p className="text-xs text-gray-400">T{flight.arrival.terminal}</p>}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{flight.airline} {flight.flightNumber}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Users size={12} /> {flight.seatsAvailable} seats
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">per person</p>
                      <p className="text-2xl font-bold text-navy-800">
                        ₹{flight.price.amount.toLocaleString("en-IN")}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ₹{(flight.price.amount * search.adults).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <button onClick={() => setSelected(flight)} className="agent-btn-gold flex items-center gap-1">
                      Book <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Booking Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl my-4">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy-800">Complete Booking</h2>
              <p className="text-sm text-gray-500">
                {selected.airline} {selected.flightNumber} — {selected.departure.airport} → {selected.arrival.airport}
              </p>
              <p className="text-sm font-bold text-navy-700 mt-1">
                Total: ₹{(selected.price.amount * search.adults).toLocaleString("en-IN")}
              </p>
            </div>
            <form onSubmit={handleBook} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="agent-label">Contact Name *</label>
                  <input type="text" value={bookingForm.contactName}
                    onChange={(e) => setBookingForm({ ...bookingForm, contactName: e.target.value })}
                    className="agent-input" required />
                </div>
                <div>
                  <label className="agent-label">Contact Phone *</label>
                  <input type="tel" value={bookingForm.contactPhone}
                    onChange={(e) => setBookingForm({ ...bookingForm, contactPhone: e.target.value })}
                    className="agent-input" required />
                </div>
              </div>
              <div>
                <label className="agent-label">Contact Email *</label>
                <input type="email" value={bookingForm.contactEmail}
                  onChange={(e) => setBookingForm({ ...bookingForm, contactEmail: e.target.value })}
                  className="agent-input" required />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-navy-800">Passenger Details</p>
                  {bookingForm.passengers.length < search.adults && (
                    <button type="button" onClick={addPassenger} className="text-xs text-navy-600 hover:text-navy-800 font-medium">
                      + Add Passenger
                    </button>
                  )}
                </div>
                {bookingForm.passengers.map((p, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 mb-3 pb-3 border-b border-gray-50 last:border-0">
                    <div className="col-span-2">
                      <label className="agent-label">Passenger {i + 1} Name *</label>
                      <input type="text" value={p.name}
                        onChange={(e) => updatePassenger(i, "name", e.target.value)}
                        placeholder="Full name (as on ID)" className="agent-input" required />
                    </div>
                    <div>
                      <label className="agent-label">Age *</label>
                      <input type="number" min={1} max={120} value={p.age}
                        onChange={(e) => updatePassenger(i, "age", parseInt(e.target.value))}
                        className="agent-input" required />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setSelected(null)} className="agent-btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={booking} className="agent-btn-gold flex-1 flex items-center justify-center gap-2">
                  {booking ? <Loader2 size={16} className="animate-spin" /> : <Plane size={16} />}
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

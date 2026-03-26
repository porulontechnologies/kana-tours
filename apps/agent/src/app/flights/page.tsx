"use client";

import { useState, useMemo } from "react";
import {
  Plane,
  Search,
  Loader2,
  ArrowLeftRight,
  Clock,
  Users,
  Filter,
  ArrowRight,
  X,
  CheckCircle,
  ChevronRight,
  User,
  Check,
  AlertCircle,
  Luggage,
  Utensils,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import AirportSearch from "@/components/AirportSearch";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  segments: unknown[];
}

interface Passenger {
  name: string;
  age: number;
  gender: string;
}

interface SeatInfo {
  id: string;
  row: number;
  col: string;
  type: "window" | "middle" | "aisle";
  seatClass: "BUSINESS" | "ECONOMY";
  occupied: boolean;
  isExit: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS = ["Passengers", "Seats", "Baggage & Meals", "Review"];

const BAGGAGE_OPTIONS = [
  { id: "none",  label: "No extra baggage", sublabel: "7 kg cabin baggage included", price: 0 },
  { id: "15kg",  label: "15 kg checked",    sublabel: "Standard domestic allowance",  price: 1200 },
  { id: "20kg",  label: "20 kg checked",    sublabel: "Recommended for longer trips", price: 1800 },
  { id: "25kg",  label: "25 kg checked",    sublabel: "Heavy packer option",           price: 2400 },
  { id: "30kg",  label: "30 kg checked",    sublabel: "Maximum allowance",             price: 3200 },
];

const AIRLINE_MEALS: Record<
  string,
  { id: string; label: string; sublabel?: string; price: number }[]
> = {
  default: [
    { id: "none",   label: "No meal",          price: 0 },
    { id: "veg",    label: "Vegetarian",        sublabel: "Indian veg hot meal",         price: 250 },
    { id: "nonveg", label: "Non-Vegetarian",    sublabel: "Chicken / mutton options",    price: 300 },
    { id: "vegan",  label: "Vegan",             sublabel: "Plant-based meal",            price: 280 },
    { id: "jain",   label: "Jain Meal",         sublabel: "No root vegetables",          price: 250 },
    { id: "child",  label: "Child Meal",        sublabel: "For children under 12",       price: 200 },
  ],
  "6E": [
    { id: "none",            label: "No meal",             price: 0 },
    { id: "veg-biryani",     label: "Veg Biryani Box",     sublabel: "IndiGo signature",       price: 299 },
    { id: "chicken-biryani", label: "Chicken Biryani Box", sublabel: "Chef's special",         price: 349 },
    { id: "paneer-wrap",     label: "Paneer Wrap",         sublabel: "With mint chutney",      price: 199 },
    { id: "snack-box",       label: "Snack Box",           sublabel: "Biscuits & juice",       price: 149 },
    { id: "jain",            label: "Jain Meal",           sublabel: "Pre-order required",     price: 250 },
  ],
  SG: [
    { id: "none",        label: "No meal",            price: 0 },
    { id: "veg-meal",    label: "Veg Hot Meal",        sublabel: "SpiceJet special",  price: 279 },
    { id: "nonveg-meal", label: "Non-Veg Hot Meal",    sublabel: "Chef's choice",     price: 329 },
    { id: "sandwich",    label: "Sandwich & Juice",    sublabel: "Light option",      price: 199 },
    { id: "combo",       label: "Meal + Snack Combo",  sublabel: "Best value",        price: 449 },
  ],
  AI: [
    { id: "standard",  label: "Standard Meal",   sublabel: "Included in fare",   price: 0 },
    { id: "veg",       label: "Vegetarian",       sublabel: "Included in fare",   price: 0 },
    { id: "nonveg",    label: "Non-Vegetarian",   sublabel: "Included in fare",   price: 0 },
    { id: "jain",      label: "Jain Meal",        sublabel: "Pre-order 24 hrs",   price: 0 },
    { id: "diabetic",  label: "Diabetic Meal",    sublabel: "Low sugar option",   price: 0 },
  ],
  UK: [
    { id: "none",   label: "No meal",           price: 0 },
    { id: "veg",    label: "Vegetarian Meal",   sublabel: "Complimentary",      price: 0 },
    { id: "nonveg", label: "Non-Veg Meal",      sublabel: "Complimentary",      price: 0 },
    { id: "jain",   label: "Jain Meal",         sublabel: "Pre-order 24 hrs",   price: 0 },
  ],
  QP: [
    { id: "none",   label: "No meal",        price: 0 },
    { id: "veg",    label: "Veg Combo",      sublabel: "Meal + drink",  price: 269 },
    { id: "nonveg", label: "Non-Veg Combo",  sublabel: "Meal + drink",  price: 319 },
    { id: "snack",  label: "Snack Pack",     sublabel: "Light bites",   price: 149 },
  ],
  G8: [
    { id: "none",         label: "No meal",       price: 0 },
    { id: "veg-thali",    label: "Veg Thali",      sublabel: "GoAir special",    price: 259 },
    { id: "nonveg-thali", label: "Non-Veg Thali",  sublabel: "GoAir special",    price: 309 },
    { id: "sandwich",     label: "Sandwich",       sublabel: "With cold drink",  price: 179 },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMealOptions(airline: string) {
  const code = airline.length <= 2 ? airline.toUpperCase() : airline.slice(0, 2).toUpperCase();
  return AIRLINE_MEALS[code] ?? AIRLINE_MEALS.default;
}

function generateSeatMap(flightId: string, travelClass: string): SeatInfo[] {
  const hash = flightId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const seats: SeatInfo[] = [];

  if (travelClass === "BUSINESS" || travelClass === "FIRST") {
    const cols = travelClass === "FIRST" ? ["A", "F"] : ["A", "C", "D", "F"];
    for (let row = 1; row <= 6; row++) {
      for (const col of cols) {
        const isOccupied = (hash + row * 7 + col.charCodeAt(0) * 3) % 4 === 0;
        const type: SeatInfo["type"] = col === "A" || col === "F" ? "window" : "aisle";
        seats.push({ id: `${row}${col}`, row, col, type, seatClass: "BUSINESS", occupied: isOccupied, isExit: false });
      }
    }
  } else {
    const startRow = travelClass === "PREMIUM_ECONOMY" ? 5 : 8;
    for (let row = startRow; row <= 30; row++) {
      for (const col of ["A", "B", "C", "D", "E", "F"]) {
        const isOccupied = (hash + row * 11 + col.charCodeAt(0) * 7) % 3 === 0;
        const type: SeatInfo["type"] =
          col === "A" || col === "F" ? "window" : col === "B" || col === "E" ? "middle" : "aisle";
        seats.push({ id: `${row}${col}`, row, col, type, seatClass: "ECONOMY", occupied: isOccupied, isExit: row === 14 || row === 15 });
      }
    }
  }
  return seats;
}

function getRowCols(travelClass: string): (string | null)[] {
  if (travelClass === "FIRST")    return ["A", null, "F"];
  if (travelClass === "BUSINESS") return ["A", "C", null, "D", "F"];
  return ["A", "B", "C", null, "D", "E", "F"];
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Seat Cell ────────────────────────────────────────────────────────────────

function SeatCell({
  seat,
  selectedByIdx,
  activeIdx,
  onSelect,
}: {
  seat: SeatInfo;
  selectedByIdx: number;
  activeIdx: number;
  onSelect: () => void;
}) {
  const isMe    = selectedByIdx === activeIdx;
  const isOther = selectedByIdx !== -1 && !isMe;

  let base =
    "w-8 h-8 rounded-t-lg text-[10px] font-semibold flex items-center justify-center transition-all select-none ";

  if (seat.occupied) {
    base += "bg-gray-200 text-gray-400 cursor-not-allowed";
  } else if (isMe) {
    base += "bg-gold-500 text-white shadow-md scale-110 cursor-pointer";
  } else if (isOther) {
    base += "bg-navy-600 text-white cursor-pointer";
  } else if (seat.type === "window") {
    base += "bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 cursor-pointer";
  } else if (seat.type === "middle") {
    base += "bg-gray-50 hover:bg-gray-200 text-gray-600 border border-gray-200 cursor-pointer";
  } else {
    base += "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer";
  }

  if (seat.isExit) base += " ring-1 ring-yellow-400";

  return (
    <button
      type="button"
      title={`Seat ${seat.id}${seat.isExit ? " — Exit row" : ""}${seat.occupied ? " (Occupied)" : ""}`}
      className={base}
      onClick={seat.occupied ? undefined : onSelect}
      disabled={seat.occupied}
    >
      {seat.occupied ? "×" : isOther ? (selectedByIdx + 1).toString() : seat.col}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentFlightsPage() {
  // Search state
  const [search, setSearch] = useState({
    origin: "", destination: "", departureDate: "", adults: 1, travelClass: "ECONOMY",
  });
  const [originLabel, setOriginLabel]           = useState("");
  const [destinationLabel, setDestinationLabel] = useState("");
  const [flights, setFlights]   = useState<Flight[]>([]);
  const [loading, setLoading]   = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy]     = useState("price");

  // Booking flow state
  const [selected, setSelected]       = useState<Flight | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking]         = useState(false);
  const [booked, setBooked]           = useState(false);

  // Step 1 — contact & passengers
  const [contactName, setContactName]   = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [agentNotes, setAgentNotes]     = useState("");
  const [passengers, setPassengers]     = useState<Passenger[]>([{ name: "", age: 30, gender: "M" }]);

  // Step 2 — seats
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activePaxIdx, setActivePaxIdx]   = useState(0);

  // Step 3 — baggage & meals
  const [baggageSelections, setBaggageSelections] = useState<string[]>([]);
  const [mealSelections, setMealSelections]       = useState<string[]>([]);

  // Derived
  const seatMap = useMemo(() => {
    if (!selected) return [];
    return generateSeatMap(selected.id, search.travelClass);
  }, [selected, search.travelClass]);

  const seatsByRow = useMemo(
    () => seatMap.reduce<Record<number, SeatInfo[]>>((acc, s) => {
      (acc[s.row] ??= []).push(s);
      return acc;
    }, {}),
    [seatMap]
  );

  const rowCols = getRowCols(search.travelClass);

  const mealOptions = useMemo(() => {
    if (!selected) return AIRLINE_MEALS.default;
    return getMealOptions(selected.airline);
  }, [selected]);

  const extrasTotal = useMemo(() => {
    const bags  = baggageSelections.reduce((s, id) => s + (BAGGAGE_OPTIONS.find((b) => b.id === id)?.price ?? 0), 0);
    const meals = mealSelections.reduce((s, id) => s + (mealOptions.find((m) => m.id === id)?.price ?? 0), 0);
    return bags + meals;
  }, [baggageSelections, mealSelections, mealOptions]);

  const grandTotal = selected ? selected.price.amount * search.adults + extrasTotal : 0;

  const canNext1 =
    contactName.trim() !== "" &&
    contactEmail.trim() !== "" &&
    contactPhone.trim() !== "" &&
    passengers.every((p) => p.name.trim() !== "");

  const canNext2 = selectedSeats.every((s) => s !== "");

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.origin || !search.destination) {
      toast.error("Please select both origin and destination airports");
      return;
    }
    if (!search.departureDate) {
      toast.error("Please select a departure date");
      return;
    }
    setLoading(true);
    setSearched(false);
    setFlights([]);
    try {
      const res = await apiClient.post("/flights/search", search);
      setFlights(res.data.data || []);
      setSearched(true);
    } catch {
      toast.error("Flight search failed. Please try again.");
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSearch((s) => ({ ...s, origin: s.destination, destination: s.origin }));
    setOriginLabel(destinationLabel);
    setDestinationLabel(originLabel);
  };

  const openBooking = (flight: Flight) => {
    const n = search.adults;
    setSelected(flight);
    setBooked(false);
    setBookingStep(1);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setAgentNotes("");
    setPassengers(Array.from({ length: n }, () => ({ name: "", age: 30, gender: "M" })));
    setSelectedSeats(Array(n).fill(""));
    setActivePaxIdx(0);
    setBaggageSelections(Array(n).fill("none"));
    setMealSelections(Array(n).fill("none"));
  };

  const updatePassenger = (idx: number, field: keyof Passenger, value: string | number) => {
    setPassengers((prev) => {
      const u = [...prev];
      u[idx] = { ...u[idx], [field]: value };
      return u;
    });
  };

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prev) => {
      const next = [...prev];
      const existing = next.indexOf(seatId);
      if (existing !== -1 && existing !== activePaxIdx) next[existing] = "";
      next[activePaxIdx] = next[activePaxIdx] === seatId ? "" : seatId;
      return next;
    });
  };

  const handleBook = async () => {
    if (!selected) return;
    setBooking(true);
    try {
      await apiClient.post("/bookings", {
        bookingType: "FLIGHT",
        totalAmount: grandTotal,
        currency: selected.price.currency,
        contactName,
        contactEmail,
        contactPhone,
        guestCount: search.adults,
        passengerDetails: {
          flight: selected,
          class: search.travelClass,
          agentNotes,
          passengers: passengers.map((p, i) => ({
            ...p,
            seat: selectedSeats[i],
            baggage: baggageSelections[i],
            meal: mealSelections[i],
          })),
          extrasTotal,
        },
        externalRef: `${selected.airline}-${selected.flightNumber}`,
      });
      setBooked(true);
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price")     return a.price.amount - b.price.amount;
    if (sortBy === "duration")  return a.duration.localeCompare(b.duration);
    if (sortBy === "departure") return new Date(a.departure.time).getTime() - new Date(b.departure.time).getTime();
    return 0;
  });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <Plane size={24} className="text-sky-600" /> Flight Booking
        </h1>
        <p className="text-sm text-gray-500 mt-1">Search and book flights for your clients</p>
      </div>

      {/* Search form */}
      <div className="agent-card">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AirportSearch
              label="From"
              value={search.origin}
              onChange={(iata, lbl) => { setSearch((s) => ({ ...s, origin: iata })); setOriginLabel(lbl); }}
            />
            <AirportSearch
              label="To"
              value={search.destination}
              onChange={(iata, lbl) => { setSearch((s) => ({ ...s, destination: iata })); setDestinationLabel(lbl); }}
            />
          </div>
          <div className="flex justify-center -mt-1">
            <button
              type="button"
              onClick={handleSwap}
              className="flex items-center gap-1.5 text-xs text-navy-600 hover:text-navy-800 font-medium"
            >
              <ArrowLeftRight size={13} /> Swap airports
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="agent-label">Date</label>
              <input
                type="date"
                value={search.departureDate}
                onChange={(e) => setSearch((s) => ({ ...s, departureDate: e.target.value }))}
                min={new Date().toISOString().split("T")[0]}
                className="agent-input"
                required
              />
            </div>
            <div>
              <label className="agent-label">Passengers</label>
              <input
                type="number"
                min={1}
                max={9}
                value={search.adults}
                onChange={(e) => setSearch((s) => ({ ...s, adults: parseInt(e.target.value) || 1 }))}
                className="agent-input text-center"
              />
            </div>
            <div className="col-span-2">
              <label className="agent-label">Class</label>
              <select
                value={search.travelClass}
                onChange={(e) => setSearch((s) => ({ ...s, travelClass: e.target.value }))}
                className="agent-select"
              >
                <option value="ECONOMY">Economy</option>
                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First Class</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="agent-btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {loading ? "Searching flights..." : "Search Flights"}
          </button>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <div className="agent-card text-center py-14">
          <Plane size={40} className="mx-auto text-sky-300 animate-pulse" />
          <p className="mt-3 text-sm font-semibold text-navy-700">Fetching live results...</p>
          <p className="text-xs text-gray-400 mt-1">Checking airlines for best fares</p>
        </div>
      ) : searched && flights.length === 0 ? (
        <div className="agent-card text-center py-14">
          <Plane size={36} className="mx-auto text-gray-300" />
          <p className="mt-3 text-sm font-semibold text-gray-600">No flights found</p>
          <p className="text-xs text-gray-400 mt-1">Try different dates, airports, or fewer passengers</p>
        </div>
      ) : flights.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-navy-700">{sortedFlights.length} flights</span> found
            </p>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="agent-select text-sm py-1.5 w-auto"
              >
                <option value="price">Price: Low to High</option>
                <option value="duration">Duration: Shortest</option>
                <option value="departure">Departure: Earliest</option>
              </select>
            </div>
          </div>

          {sortedFlights.map((flight) => (
            <div key={flight.id} className="agent-card hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Route info */}
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-navy-800">{formatTime(flight.departure.time)}</p>
                    <p className="text-sm font-medium text-navy-600">{flight.departure.airport}</p>
                    {flight.departure.terminal && (
                      <p className="text-xs text-gray-400">T{flight.departure.terminal}</p>
                    )}
                    <p className="text-[10px] text-gray-400">{formatDate(flight.departure.time)}</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={12} /> {formatDuration(flight.duration)}
                    </div>
                    <div className="flex items-center w-full">
                      <div className="flex-1 h-px bg-gray-200" />
                      <Plane size={14} className="mx-2 text-sky-500" />
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <p className="text-xs text-gray-400">
                      {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-navy-800">{formatTime(flight.arrival.time)}</p>
                    <p className="text-sm font-medium text-navy-600">{flight.arrival.airport}</p>
                    {flight.arrival.terminal && (
                      <p className="text-xs text-gray-400">T{flight.arrival.terminal}</p>
                    )}
                  </div>

                  <div className="text-center hidden sm:block">
                    <p className="text-xs font-semibold text-navy-700">{flight.airline}</p>
                    <p className="text-xs text-gray-400">{flight.flightNumber}</p>
                    {flight.seatsAvailable > 0 && (
                      <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                        <Users size={11} /> {flight.seatsAvailable} left
                      </div>
                    )}
                  </div>
                </div>

                {/* Price + book */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">per person</p>
                    <p className="text-2xl font-bold text-navy-800">
                      ₹{flight.price.amount.toLocaleString("en-IN")}
                    </p>
                    {search.adults > 1 && (
                      <p className="text-sm text-gray-500">
                        Total ₹{(flight.price.amount * search.adults).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => openBooking(flight)}
                    className="agent-btn-gold flex items-center gap-1.5 text-sm"
                  >
                    Book <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* ── Booking Modal ──────────────────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl flex flex-col">

            {/* Modal header */}
            <div className="border-b border-gray-100 px-6 py-4 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-navy-700">
                      {selected.airline} {selected.flightNumber}
                    </span>
                    {" · "}
                    {selected.departure.airport} → {selected.arrival.airport}
                    {" · "}
                    {formatDate(selected.departure.time)}
                  </p>
                  {!booked && (
                    <p className="mt-0.5 text-sm font-bold text-gold-600">
                      ₹{grandTotal.toLocaleString("en-IN")}
                      <span className="ml-1.5 text-xs font-normal text-gray-400">
                        (base ₹{(selected.price.amount * search.adults).toLocaleString("en-IN")}
                        {extrasTotal > 0 && ` + extras ₹${extrasTotal.toLocaleString("en-IN")}`})
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="ml-4 flex-shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Step indicator */}
              {!booked && (
                <div className="mt-3 flex items-center">
                  {STEPS.map((step, idx) => {
                    const num    = idx + 1;
                    const active = num === bookingStep;
                    const done   = num < bookingStep;
                    return (
                      <div key={step} className="flex items-center flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                              done ? "bg-emerald-500 text-white" : active ? "bg-navy-600 text-white" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {done ? <Check size={12} /> : num}
                          </div>
                          <span
                            className={`text-xs hidden sm:block truncate ${
                              active ? "font-semibold text-navy-700" : done ? "text-emerald-600" : "text-gray-400"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                        {idx < STEPS.length - 1 && (
                          <div className={`h-px flex-1 mx-2 ${done ? "bg-emerald-300" : "bg-gray-200"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal body */}
            {booked ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <CheckCircle size={64} className="text-emerald-500" />
                <h3 className="mt-4 text-xl font-bold text-navy-800">Booking Confirmed!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Seats {selectedSeats.join(", ")} reserved for {contactName}.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Total: ₹{grandTotal.toLocaleString("en-IN")}
                </p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setSelected(null)} className="agent-btn-secondary px-5 py-2.5 text-sm">
                    Close
                  </button>
                  <button
                    onClick={() => { setSelected(null); setBooked(false); }}
                    className="agent-btn-primary px-5 py-2.5 text-sm"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-y-auto" style={{ maxHeight: "62vh" }}>

                  {/* ── Step 1: Passengers ──────────────────────────────────── */}
                  {bookingStep === 1 && (
                    <div className="px-6 py-5 space-y-5">
                      <p className="text-sm font-semibold text-navy-800">Customer Contact Details</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="agent-label">Full Name *</label>
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Customer name"
                            className="agent-input"
                          />
                        </div>
                        <div>
                          <label className="agent-label">Phone *</label>
                          <input
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="agent-input"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="agent-label">Email *</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="customer@email.com"
                          className="agent-input"
                        />
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <p className="mb-3 text-sm font-semibold text-navy-800">
                          Passenger Details ({search.adults} passenger{search.adults > 1 ? "s" : ""})
                        </p>
                        <div className="space-y-4">
                          {passengers.map((p, i) => (
                            <div key={i} className="rounded-xl bg-gray-50 p-4">
                              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Passenger {i + 1}
                              </p>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                  <label className="agent-label">Full Name (as on ID) *</label>
                                  <input
                                    type="text"
                                    value={p.name}
                                    onChange={(e) => updatePassenger(i, "name", e.target.value)}
                                    placeholder="e.g. John Smith"
                                    className="agent-input"
                                  />
                                </div>
                                <div>
                                  <label className="agent-label">Age *</label>
                                  <input
                                    type="number"
                                    min={1}
                                    max={120}
                                    value={p.age}
                                    onChange={(e) => updatePassenger(i, "age", parseInt(e.target.value) || 1)}
                                    className="agent-input"
                                  />
                                </div>
                              </div>
                              <div className="mt-3">
                                <label className="agent-label">Gender</label>
                                <select
                                  value={p.gender}
                                  onChange={(e) => updatePassenger(i, "gender", e.target.value)}
                                  className="agent-select"
                                >
                                  <option value="M">Male</option>
                                  <option value="F">Female</option>
                                  <option value="O">Other</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <label className="agent-label">Agent Notes (optional)</label>
                        <textarea
                          value={agentNotes}
                          onChange={(e) => setAgentNotes(e.target.value)}
                          rows={2}
                          placeholder="Internal notes for this booking..."
                          className="agent-input resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Seat Selection ──────────────────────────────── */}
                  {bookingStep === 2 && (
                    <div className="px-6 py-5">
                      {/* Passenger tabs */}
                      {search.adults > 1 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {passengers.map((p, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActivePaxIdx(i)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                                activePaxIdx === i
                                  ? "bg-navy-600 text-white"
                                  : selectedSeats[i]
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              <User size={12} />
                              {p.name || `Passenger ${i + 1}`}
                              {selectedSeats[i] && (
                                <span className="ml-1 font-bold">{selectedSeats[i]}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mb-3">
                        Selecting seat for:{" "}
                        <span className="font-semibold text-navy-700">
                          {passengers[activePaxIdx]?.name || `Passenger ${activePaxIdx + 1}`}
                        </span>
                      </p>

                      {/* Legend */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-[10px] text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-sky-50 border border-sky-200" />
                          Window
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-gray-50 border border-gray-200" />
                          Middle
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-emerald-50 border border-emerald-200" />
                          Aisle
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-gold-500" />
                          Your seat
                        </span>
                        {search.adults > 1 && (
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block w-4 h-4 rounded bg-navy-600" />
                            Other passenger
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-gray-200" />
                          Occupied
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-gray-50 border border-gray-200 ring-1 ring-yellow-400" />
                          Exit row
                        </span>
                      </div>

                      {/* Aircraft nose */}
                      <div className="flex justify-center mb-3">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-8 bg-gray-100 rounded-t-full flex items-center justify-center">
                            <Plane size={16} className="text-gray-400 -rotate-90" />
                          </div>
                          <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-widest">Front</p>
                        </div>
                      </div>

                      {/* Seat map */}
                      <div className="overflow-x-auto">
                        <div className="inline-block min-w-full pb-2">
                          {/* Column headers */}
                          <div className="flex items-center mb-1 pl-8 gap-1">
                            {rowCols.map((col, ci) =>
                              col === null ? (
                                <div key={`hgap-${ci}`} className="w-5" />
                              ) : (
                                <div key={col} className="w-8 text-center text-[10px] font-bold text-gray-400">
                                  {col}
                                </div>
                              )
                            )}
                          </div>

                          {/* Rows */}
                          {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => {
                            const isExit = rowSeats.some((s) => s.isExit);
                            return (
                              <div key={rowNum}>
                                {isExit && (
                                  <div className="flex items-center gap-1.5 my-1 text-[10px] text-yellow-600 font-medium">
                                    <AlertCircle size={11} />
                                    Exit row — extra legroom
                                  </div>
                                )}
                                <div className="flex items-center gap-1 mb-0.5">
                                  <div className="w-7 text-[10px] text-gray-400 text-right pr-1.5 font-medium shrink-0">
                                    {rowNum}
                                  </div>
                                  {rowCols.map((col, ci) => {
                                    if (col === null)
                                      return <div key={`gap-${rowNum}-${ci}`} className="w-5" />;
                                    const seat = rowSeats.find((s) => s.col === col);
                                    if (!seat) return <div key={col} className="w-8 h-8" />;
                                    const selIdx = selectedSeats.indexOf(seat.id);
                                    return (
                                      <SeatCell
                                        key={seat.id}
                                        seat={seat}
                                        selectedByIdx={selIdx}
                                        activeIdx={activePaxIdx}
                                        onSelect={() => handleSeatClick(seat.id)}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selection status */}
                      <div className="mt-4 rounded-xl bg-gray-50 p-3 flex flex-wrap gap-2">
                        {passengers.map((p, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                              selectedSeats[i]
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {selectedSeats[i] ? <Check size={11} /> : <AlertCircle size={11} />}
                            {p.name || `Pax ${i + 1}`}: <strong>{selectedSeats[i] || "No seat"}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Step 3: Baggage & Meals ─────────────────────────────── */}
                  {bookingStep === 3 && (
                    <div className="px-6 py-5 space-y-5">
                      {passengers.map((p, i) => (
                        <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
                          {/* Pax header */}
                          <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-2 border-b border-gray-100">
                            <User size={14} className="text-gray-500" />
                            <span className="text-xs font-semibold text-gray-700">
                              {p.name || `Passenger ${i + 1}`}
                            </span>
                            {selectedSeats[i] && (
                              <span className="ml-auto text-xs text-gray-400">
                                Seat <strong className="text-navy-700">{selectedSeats[i]}</strong>
                              </span>
                            )}
                          </div>

                          {/* Baggage */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <Luggage size={15} className="text-navy-700" />
                              <p className="text-xs font-semibold text-navy-700">Checked Baggage</p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {BAGGAGE_OPTIONS.map((opt) => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => {
                                    const next = [...baggageSelections];
                                    next[i] = opt.id;
                                    setBaggageSelections(next);
                                  }}
                                  className={`p-2.5 rounded-lg border text-left transition-all ${
                                    baggageSelections[i] === opt.id
                                      ? "border-navy-600 bg-navy-50 ring-1 ring-navy-600"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <p className="text-xs font-semibold text-navy-700">{opt.label}</p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">{opt.sublabel}</p>
                                  <p className={`text-xs font-bold mt-1.5 ${opt.price === 0 ? "text-emerald-600" : "text-gold-600"}`}>
                                    {opt.price === 0 ? "Free" : `+₹${opt.price.toLocaleString("en-IN")}`}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Meals */}
                          <div className="px-4 py-3">
                            <div className="flex items-center gap-2 mb-3">
                              <Utensils size={15} className="text-navy-700" />
                              <p className="text-xs font-semibold text-navy-700">Meal Preference</p>
                              <span className="ml-auto text-[10px] text-gray-400">
                                {selected.airline} meals
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {mealOptions.map((opt) => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => {
                                    const next = [...mealSelections];
                                    next[i] = opt.id;
                                    setMealSelections(next);
                                  }}
                                  className={`p-2.5 rounded-lg border text-left transition-all ${
                                    mealSelections[i] === opt.id
                                      ? "border-gold-500 bg-gold-50 ring-1 ring-gold-500"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <p className="text-xs font-semibold text-navy-700">{opt.label}</p>
                                  {opt.sublabel && (
                                    <p className="text-[10px] text-gray-500 mt-0.5">{opt.sublabel}</p>
                                  )}
                                  <p className={`text-xs font-bold mt-1.5 ${opt.price === 0 ? "text-emerald-600" : "text-gold-600"}`}>
                                    {opt.price === 0 ? "Included" : `+₹${opt.price.toLocaleString("en-IN")}`}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── Step 4: Review ──────────────────────────────────────── */}
                  {bookingStep === 4 && (
                    <div className="px-6 py-5 space-y-4">
                      {/* Flight */}
                      <div className="rounded-xl border border-gray-200 p-4">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Flight</p>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-navy-800">
                              {selected.departure.airport} → {selected.arrival.airport}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {formatTime(selected.departure.time)} → {formatTime(selected.arrival.time)}
                              {" · "}
                              {formatDuration(selected.duration)}
                              {" · "}
                              {selected.stops === 0 ? "Non-stop" : `${selected.stops} stop${selected.stops > 1 ? "s" : ""}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selected.airline} {selected.flightNumber}
                              {" · "}
                              {formatDate(selected.departure.time)}
                              {" · "}
                              {search.travelClass.replace("_", " ")}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[10px] text-gray-400">{search.adults} pax</p>
                            <p className="font-bold text-navy-800">
                              ₹{(selected.price.amount * search.adults).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Passengers */}
                      <div className="rounded-xl border border-gray-200 overflow-hidden">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 px-4 py-2.5 bg-gray-50">
                          Passengers
                        </p>
                        {passengers.map((p, i) => {
                          const bagOpt  = BAGGAGE_OPTIONS.find((b) => b.id === baggageSelections[i]);
                          const mealOpt = mealOptions.find((m) => m.id === mealSelections[i]);
                          return (
                            <div key={i} className="px-4 py-3 border-b border-gray-100 last:border-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-navy-800">{p.name}</p>
                                  <p className="text-xs text-gray-500">
                                    Age {p.age} ·{" "}
                                    {p.gender === "M" ? "Male" : p.gender === "F" ? "Female" : "Other"}
                                  </p>
                                </div>
                                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                                  Seat {selectedSeats[i]}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  🧳 {bagOpt?.label ?? "—"}
                                  {(bagOpt?.price ?? 0) > 0 && ` (+₹${bagOpt!.price})`}
                                </span>
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  🍽 {mealOpt?.label ?? "—"}
                                  {(mealOpt?.price ?? 0) > 0 && ` (+₹${mealOpt!.price})`}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Contact */}
                      <div className="rounded-xl border border-gray-200 p-4">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          Customer Contact
                        </p>
                        <p className="text-sm font-medium text-navy-800">{contactName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {contactEmail} · {contactPhone}
                        </p>
                        {agentNotes && (
                          <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
                            <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">
                              Agent Notes
                            </p>
                            <p className="text-xs text-gray-700 mt-0.5">{agentNotes}</p>
                          </div>
                        )}
                      </div>

                      {/* Price breakdown */}
                      <div className="rounded-xl bg-navy-50 p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Base fare ({search.adults} × ₹{selected.price.amount.toLocaleString("en-IN")})
                          </span>
                          <span className="font-semibold text-navy-800">
                            ₹{(selected.price.amount * search.adults).toLocaleString("en-IN")}
                          </span>
                        </div>
                        {baggageSelections.map((id, i) => {
                          const opt = BAGGAGE_OPTIONS.find((b) => b.id === id);
                          if (!opt || opt.price === 0) return null;
                          return (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Baggage — {passengers[i]?.name || `Pax ${i + 1}`} ({opt.label})
                              </span>
                              <span className="font-semibold text-navy-800">₹{opt.price.toLocaleString("en-IN")}</span>
                            </div>
                          );
                        })}
                        {mealSelections.map((id, i) => {
                          const opt = mealOptions.find((m) => m.id === id);
                          if (!opt || opt.price === 0) return null;
                          return (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Meal — {passengers[i]?.name || `Pax ${i + 1}`} ({opt.label})
                              </span>
                              <span className="font-semibold text-navy-800">₹{opt.price.toLocaleString("en-IN")}</span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between pt-3 border-t border-navy-200">
                          <span className="font-bold text-navy-800">Total</span>
                          <span className="text-xl font-bold text-gold-600">
                            ₹{grandTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal footer */}
                <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => bookingStep > 1 ? setBookingStep((s) => s - 1) : setSelected(null)}
                    className="agent-btn-secondary px-5 py-2.5 text-sm"
                  >
                    {bookingStep > 1 ? "Back" : "Cancel"}
                  </button>

                  {bookingStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (bookingStep === 1 && !canNext1) {
                          toast.error("Please fill in all required fields");
                          return;
                        }
                        if (bookingStep === 2 && !canNext2) {
                          toast.error("Please select a seat for every passenger");
                          return;
                        }
                        setBookingStep((s) => s + 1);
                      }}
                      className="agent-btn-primary px-6 py-2.5 text-sm flex items-center gap-2"
                    >
                      Continue <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBook}
                      disabled={booking}
                      className="agent-btn-gold px-6 py-2.5 text-sm flex items-center gap-2"
                    >
                      {booking ? <Loader2 size={15} className="animate-spin" /> : <Plane size={15} />}
                      {booking ? "Confirming..." : "Confirm Booking"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

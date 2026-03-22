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
import { useSession } from "next-auth/react";
import Link from "next/link";
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
  segments: any[];
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
    { id: "none",       label: "No meal",            price: 0 },
    { id: "veg-meal",   label: "Veg Hot Meal",        sublabel: "SpiceJet special",  price: 279 },
    { id: "nonveg-meal",label: "Non-Veg Hot Meal",    sublabel: "Chef's choice",     price: 329 },
    { id: "sandwich",   label: "Sandwich & Juice",    sublabel: "Light option",      price: 199 },
    { id: "combo",      label: "Meal + Snack Combo",  sublabel: "Best value",        price: 449 },
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
    { id: "none",            label: "No meal",             price: 0 },
    { id: "veg-thali",       label: "Veg Thali",           sublabel: "GoAir special",   price: 259 },
    { id: "nonveg-thali",    label: "Non-Veg Thali",       sublabel: "GoAir special",   price: 309 },
    { id: "sandwich",        label: "Sandwich",            sublabel: "With cold drink",  price: 179 },
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
  if (travelClass === "FIRST") return ["A", null, "F"];
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

// ─── Seat cell ────────────────────────────────────────────────────────────────

function SeatCell({
  seat,
  selectedByIdx,
  activeIdx,
  onSelect,
}: {
  seat: SeatInfo;
  selectedByIdx: number; // -1 = not selected
  activeIdx: number;
  onSelect: () => void;
}) {
  const isMe = selectedByIdx === activeIdx;
  const isOther = selectedByIdx !== -1 && !isMe;

  let base =
    "w-8 h-8 sm:w-9 sm:h-9 rounded-t-lg text-[10px] sm:text-xs font-semibold flex items-center justify-center transition-all select-none ";

  if (seat.occupied) {
    base += "bg-gray-200 text-gray-400 cursor-not-allowed";
  } else if (isMe) {
    base += "bg-gold text-white shadow-md scale-110 cursor-pointer";
  } else if (isOther) {
    base += "bg-navy text-white cursor-pointer";
  } else if (seat.type === "window") {
    base += "bg-sky/15 hover:bg-sky/35 text-sky-700 border border-sky/30 cursor-pointer";
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

export default function FlightsPage() {
  const { data: session } = useSession();

  // Search
  const [search, setSearch] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    adults: 1,
    travelClass: "ECONOMY",
  });
  const [originLabel, setOriginLabel] = useState("");
  const [destinationLabel, setDestinationLabel] = useState("");

  // Results
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  // Booking — common
  const [selected, setSelected] = useState<Flight | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  // Step 1 — contact & passengers
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: "", age: 30, gender: "M" }]);

  // Step 2 — seats
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activePaxIdx, setActivePaxIdx] = useState(0);

  // Step 3 — baggage & meals
  const [baggageSelections, setBaggageSelections] = useState<string[]>([]);
  const [mealSelections, setMealSelections] = useState<string[]>([]);

  // Seat map
  const seatMap = useMemo(() => {
    if (!selected) return [];
    return generateSeatMap(selected.id, search.travelClass);
  }, [selected, search.travelClass]);

  const seatsByRow = useMemo(
    () =>
      seatMap.reduce<Record<number, SeatInfo[]>>((acc, s) => {
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

  // Totals
  const extrasTotal = useMemo(() => {
    const bags = baggageSelections.reduce(
      (s, id) => s + (BAGGAGE_OPTIONS.find((b) => b.id === id)?.price ?? 0),
      0
    );
    const meals = mealSelections.reduce(
      (s, id) => s + (mealOptions.find((m) => m.id === id)?.price ?? 0),
      0
    );
    return bags + meals;
  }, [baggageSelections, mealSelections, mealOptions]);

  const grandTotal = selected ? selected.price.amount * search.adults + extrasTotal : 0;

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
    setContactName((session?.user?.name as string) || "");
    setContactEmail((session?.user?.email as string) || "");
    setContactPhone("");
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
      // Deselect from any other passenger who has this seat
      const existing = next.indexOf(seatId);
      if (existing !== -1 && existing !== activePaxIdx) next[existing] = "";
      // Toggle: clicking own seat deselects
      next[activePaxIdx] = next[activePaxIdx] === seatId ? "" : seatId;
      return next;
    });
  };

  const canNext1 =
    contactName.trim() !== "" &&
    contactEmail.trim() !== "" &&
    contactPhone.trim() !== "" &&
    passengers.every((p) => p.name.trim() !== "");

  const canNext2 = selectedSeats.every((s) => s !== "");

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
    if (sortBy === "price") return a.price.amount - b.price.amount;
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    if (sortBy === "departure")
      return new Date(a.departure.time).getTime() - new Date(b.departure.time).getTime();
    return 0;
  });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Search Flights</h1>
          <p className="mt-2 text-lg text-white/70">Find the best fares powered by live airline data</p>
        </div>
      </div>

      {/* Search form */}
      <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <AirportSearch
                label="From"
                value={search.origin}
                onChange={(iata, lbl) => { setSearch((s) => ({ ...s, origin: iata })); setOriginLabel(lbl); }}
              />
            </div>

            <div className="flex items-end justify-center lg:col-span-1">
              <button
                type="button"
                onClick={handleSwap}
                className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:border-navy hover:bg-navy/5 hover:text-navy transition-colors"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            <div className="lg:col-span-3">
              <AirportSearch
                label="To"
                value={search.destination}
                onChange={(iata, lbl) => { setSearch((s) => ({ ...s, destination: iata })); setDestinationLabel(lbl); }}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Date</label>
              <input
                type="date"
                value={search.departureDate}
                onChange={(e) => setSearch((s) => ({ ...s, departureDate: e.target.value }))}
                min={new Date().toISOString().split("T")[0]}
                className="input-field"
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Passengers &amp; Class</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={search.adults}
                  onChange={(e) => setSearch((s) => ({ ...s, adults: parseInt(e.target.value) || 1 }))}
                  className="input-field w-16 text-center"
                />
                <select
                  value={search.travelClass}
                  onChange={(e) => setSearch((s) => ({ ...s, travelClass: e.target.value }))}
                  className="input-field flex-1 text-sm"
                >
                  <option value="ECONOMY">Economy</option>
                  <option value="PREMIUM_ECONOMY">Prem. Eco</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First</option>
                </select>
              </div>
            </div>

            <div className="flex items-end lg:col-span-1">
              <button type="submit" disabled={loading} className="btn-gold w-full justify-center py-2.5 flex items-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="hidden sm:inline">{loading ? "Searching..." : "Search"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {!searched && !loading ? (
          <div className="rounded-2xl bg-white py-24 text-center shadow-md">
            <Plane className="mx-auto h-16 w-16 text-gray-200" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">Search for Flights</h3>
            <p className="mt-2 text-sm text-gray-500">Enter your travel details above to see live flight availability</p>
          </div>
        ) : loading ? (
          <div className="rounded-2xl bg-white py-24 text-center shadow-md">
            <Plane className="mx-auto h-16 w-16 animate-pulse text-gold" />
            <p className="mt-4 text-lg font-semibold text-navy">Searching flights...</p>
            <p className="mt-1 text-sm text-gray-500">Fetching live results from airlines</p>
          </div>
        ) : searched && flights.length === 0 ? (
          <div className="rounded-2xl bg-white py-24 text-center shadow-md">
            <Plane className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">No flights found</h3>
            <p className="mt-2 text-sm text-gray-500">Try different dates, airports, or fewer passengers</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-navy">{sortedFlights.length} flights</span> found
              </p>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky focus:outline-none"
                >
                  <option value="price">Price: Low to High</option>
                  <option value="duration">Duration: Shortest</option>
                  <option value="departure">Departure: Earliest</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {sortedFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="grid items-center gap-4 p-5 sm:grid-cols-12">
                    {/* Airline */}
                    <div className="sm:col-span-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-sm font-bold text-navy">
                        {flight.airline.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-navy">{flight.airline}</p>
                      <p className="text-xs text-gray-400">{flight.flightNumber}</p>
                    </div>

                    {/* Route */}
                    <div className="sm:col-span-5">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-navy">{formatTime(flight.departure.time)}</p>
                          <p className="text-xs font-semibold text-gray-600">{flight.departure.airport}</p>
                          {flight.departure.terminal && (
                            <p className="text-[10px] text-gray-400">Terminal {flight.departure.terminal}</p>
                          )}
                          <p className="text-[10px] text-gray-400">{formatDate(flight.departure.time)}</p>
                        </div>

                        <div className="flex-1 px-3">
                          <p className="text-center text-[10px] text-gray-400">
                            <Clock className="mr-0.5 inline h-3 w-3" />
                            {formatDuration(flight.duration)}
                          </p>
                          <div className="relative my-1.5">
                            <div className="h-px bg-gray-300" />
                            <Plane className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-sky" />
                          </div>
                          <p className="text-center text-[10px] text-gray-400">
                            {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold text-navy">{formatTime(flight.arrival.time)}</p>
                          <p className="text-xs font-semibold text-gray-600">{flight.arrival.airport}</p>
                          {flight.arrival.terminal && (
                            <p className="text-[10px] text-gray-400">Terminal {flight.arrival.terminal}</p>
                          )}
                          <p className="text-[10px] text-gray-400">{formatDate(flight.arrival.time)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Cabin + seats */}
                    <div className="sm:col-span-2">
                      <span className="inline-block rounded-full bg-background px-2.5 py-1 text-xs font-medium text-gray-600">
                        {search.travelClass.replace("_", " ")}
                      </span>
                      {flight.seatsAvailable > 0 && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600">
                          <Users className="h-3 w-3" />
                          {flight.seatsAvailable} seats left
                        </p>
                      )}
                    </div>

                    {/* Price + Book */}
                    <div className="text-right sm:col-span-3">
                      <p className="text-xs text-gray-400">per person</p>
                      <p className="text-2xl font-bold text-gold">₹{flight.price.amount.toLocaleString("en-IN")}</p>
                      {search.adults > 1 && (
                        <p className="text-xs text-gray-500">
                          Total ₹{(flight.price.amount * search.adults).toLocaleString("en-IN")}
                        </p>
                      )}
                      {session ? (
                        <button
                          onClick={() => openBooking(flight)}
                          className="btn-gold mt-2 flex items-center gap-1.5 px-4 py-2 text-sm ml-auto"
                        >
                          Book Now <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <Link
                          href="/login?callbackUrl=/flights"
                          className="btn-outline mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm"
                        >
                          Login to Book
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Booking modal ─────────────────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl flex flex-col">

            {/* Modal header */}
            <div className="border-b border-gray-100 px-6 py-4 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-navy">{selected.airline} {selected.flightNumber}</span>
                    {" · "}
                    {selected.departure.airport} → {selected.arrival.airport}
                    {" · "}
                    {formatDate(selected.departure.time)}
                  </p>
                  {!booked && (
                    <p className="mt-0.5 text-sm font-bold text-gold">
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
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Step indicator */}
              {!booked && (
                <div className="mt-3 flex items-center">
                  {STEPS.map((step, idx) => {
                    const num = idx + 1;
                    const active = num === bookingStep;
                    const done = num < bookingStep;
                    return (
                      <div key={step} className="flex items-center flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                              done ? "bg-emerald-500 text-white" : active ? "bg-navy text-white" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {done ? <Check className="h-3.5 w-3.5" /> : num}
                          </div>
                          <span
                            className={`text-xs hidden sm:block truncate ${
                              active ? "font-semibold text-navy" : done ? "text-emerald-600" : "text-gray-400"
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
                <CheckCircle className="h-16 w-16 text-emerald-500" />
                <h3 className="mt-4 text-xl font-bold text-navy">Booking Confirmed!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Seats {selectedSeats.join(", ")} reserved. Check your dashboard for full details.
                </p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setSelected(null)} className="btn-outline px-5 py-2.5 text-sm">
                    Search More
                  </button>
                  <Link href="/dashboard/bookings" className="btn-gold px-5 py-2.5 text-sm">
                    View Bookings
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-y-auto" style={{ maxHeight: "62vh" }}>

                  {/* ── Step 1: Passengers ──────────────────────────────────── */}
                  {bookingStep === 1 && (
                    <div className="px-6 py-5 space-y-4">
                      <p className="text-sm font-semibold text-navy">Contact Details</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-gray-500">Full Name *</label>
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-gray-500">Phone *</label>
                          <input
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">Email *</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="input-field"
                        />
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <p className="mb-3 text-sm font-semibold text-navy">
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
                                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    Full Name (as on ID) *
                                  </label>
                                  <input
                                    type="text"
                                    value={p.name}
                                    onChange={(e) => updatePassenger(i, "name", e.target.value)}
                                    placeholder="e.g. John Smith"
                                    className="input-field"
                                  />
                                </div>
                                <div>
                                  <label className="mb-1.5 block text-xs font-medium text-gray-500">Age *</label>
                                  <input
                                    type="number"
                                    min={1}
                                    max={120}
                                    value={p.age}
                                    onChange={(e) => updatePassenger(i, "age", parseInt(e.target.value) || 1)}
                                    className="input-field"
                                  />
                                </div>
                              </div>
                              <div className="mt-3">
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">Gender</label>
                                <select
                                  value={p.gender}
                                  onChange={(e) => updatePassenger(i, "gender", e.target.value)}
                                  className="input-field"
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
                                  ? "bg-navy text-white"
                                  : selectedSeats[i]
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              <User className="h-3 w-3" />
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
                        <span className="font-semibold text-navy">
                          {passengers[activePaxIdx]?.name || `Passenger ${activePaxIdx + 1}`}
                        </span>
                      </p>

                      {/* Legend */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-[10px] text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-sky/15 border border-sky/30" />
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
                          <span className="inline-block w-4 h-4 rounded bg-gold" />
                          Your seat
                        </span>
                        {search.adults > 1 && (
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block w-4 h-4 rounded bg-navy" />
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
                            <Plane className="h-4 w-4 text-gray-400 -rotate-90" />
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
                                <div
                                  key={col}
                                  className="w-8 sm:w-9 text-center text-[10px] font-bold text-gray-400"
                                >
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
                                    <AlertCircle className="h-3 w-3" />
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
                                    if (!seat)
                                      return <div key={col} className="w-8 sm:w-9 h-8 sm:h-9" />;
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
                            {selectedSeats[i] ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <AlertCircle className="h-3 w-3" />
                            )}
                            {p.name || `Pax ${i + 1}`}:{" "}
                            <strong>{selectedSeats[i] || "No seat"}</strong>
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
                            <User className="h-3.5 w-3.5 text-gray-500" />
                            <span className="text-xs font-semibold text-gray-700">
                              {p.name || `Passenger ${i + 1}`}
                            </span>
                            {selectedSeats[i] && (
                              <span className="ml-auto text-xs text-gray-400">
                                Seat <strong className="text-navy">{selectedSeats[i]}</strong>
                              </span>
                            )}
                          </div>

                          {/* Baggage */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <Luggage className="h-4 w-4 text-navy" />
                              <p className="text-xs font-semibold text-navy">Checked Baggage</p>
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
                                      ? "border-navy bg-navy/5 ring-1 ring-navy"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <p className="text-xs font-semibold text-navy">{opt.label}</p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">{opt.sublabel}</p>
                                  <p
                                    className={`text-xs font-bold mt-1.5 ${
                                      opt.price === 0 ? "text-emerald-600" : "text-gold"
                                    }`}
                                  >
                                    {opt.price === 0 ? "Free" : `+₹${opt.price.toLocaleString("en-IN")}`}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Meals */}
                          <div className="px-4 py-3">
                            <div className="flex items-center gap-2 mb-3">
                              <Utensils className="h-4 w-4 text-navy" />
                              <p className="text-xs font-semibold text-navy">Meal Preference</p>
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
                                      ? "border-gold bg-gold/5 ring-1 ring-gold"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <p className="text-xs font-semibold text-navy">{opt.label}</p>
                                  {opt.sublabel && (
                                    <p className="text-[10px] text-gray-500 mt-0.5">{opt.sublabel}</p>
                                  )}
                                  <p
                                    className={`text-xs font-bold mt-1.5 ${
                                      opt.price === 0 ? "text-emerald-600" : "text-gold"
                                    }`}
                                  >
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
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          Flight
                        </p>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold text-navy">
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
                            <p className="font-bold text-navy">
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
                          const bagOpt = BAGGAGE_OPTIONS.find((b) => b.id === baggageSelections[i]);
                          const mealOpt = mealOptions.find((m) => m.id === mealSelections[i]);
                          return (
                            <div key={i} className="px-4 py-3 border-b border-gray-100 last:border-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-navy">{p.name}</p>
                                  <p className="text-xs text-gray-500">
                                    Age {p.age} ·{" "}
                                    {p.gender === "M" ? "Male" : p.gender === "F" ? "Female" : "Other"}
                                  </p>
                                </div>
                                <span className="text-xs font-bold text-sky bg-sky/10 px-2 py-1 rounded-full">
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
                          Contact
                        </p>
                        <p className="text-sm font-medium text-navy">{contactName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {contactEmail} · {contactPhone}
                        </p>
                      </div>

                      {/* Price breakdown */}
                      <div className="rounded-xl bg-navy/5 p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Base fare ({search.adults} × ₹{selected.price.amount.toLocaleString("en-IN")})
                          </span>
                          <span className="font-semibold text-navy">
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
                              <span className="font-semibold text-navy">₹{opt.price.toLocaleString("en-IN")}</span>
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
                              <span className="font-semibold text-navy">₹{opt.price.toLocaleString("en-IN")}</span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between pt-3 border-t border-navy/10">
                          <span className="font-bold text-navy">Total</span>
                          <span className="text-xl font-bold text-gold">₹{grandTotal.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal footer */}
                <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      bookingStep > 1 ? setBookingStep((s) => s - 1) : setSelected(null)
                    }
                    className="btn-outline px-5 py-2.5 text-sm"
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
                      className="btn-gold px-6 py-2.5 text-sm flex items-center gap-2"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBook}
                      disabled={booking}
                      className="btn-gold px-6 py-2.5 text-sm flex items-center gap-2"
                    >
                      {booking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plane className="h-4 w-4" />
                      )}
                      {booking ? "Confirming..." : "Confirm & Pay"}
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

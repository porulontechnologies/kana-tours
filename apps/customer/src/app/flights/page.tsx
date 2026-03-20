"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import Link from "next/link";
import {
  Plane,
  MapPin,
  Calendar,
  Users,
  Search,
  Clock,
  ArrowRight,
  Luggage,
  ArrowLeftRight,
  Filter,
} from "lucide-react";

interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  cabinClass: string;
  seatsAvailable: number;
}

const fallbackFlights: Flight[] = [
  {
    id: "f1",
    airline: "Air India",
    airlineLogo: "AI",
    flightNumber: "AI-205",
    origin: "New Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    departureTime: "06:30",
    arrivalTime: "08:45",
    duration: "2h 15m",
    price: 4599,
    stops: 0,
    cabinClass: "Economy",
    seatsAvailable: 23,
  },
  {
    id: "f2",
    airline: "IndiGo",
    airlineLogo: "6E",
    flightNumber: "6E-312",
    origin: "New Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    departureTime: "09:15",
    arrivalTime: "11:30",
    duration: "2h 15m",
    price: 3899,
    stops: 0,
    cabinClass: "Economy",
    seatsAvailable: 45,
  },
  {
    id: "f3",
    airline: "Vistara",
    airlineLogo: "UK",
    flightNumber: "UK-945",
    origin: "New Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    departureTime: "14:00",
    arrivalTime: "16:20",
    duration: "2h 20m",
    price: 5299,
    stops: 0,
    cabinClass: "Economy",
    seatsAvailable: 12,
  },
  {
    id: "f4",
    airline: "SpiceJet",
    airlineLogo: "SG",
    flightNumber: "SG-118",
    origin: "New Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    departureTime: "17:45",
    arrivalTime: "20:30",
    duration: "2h 45m",
    price: 3499,
    stops: 1,
    cabinClass: "Economy",
    seatsAvailable: 34,
  },
  {
    id: "f5",
    airline: "Air India",
    airlineLogo: "AI",
    flightNumber: "AI-680",
    origin: "New Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    departureTime: "21:00",
    arrivalTime: "23:10",
    duration: "2h 10m",
    price: 6799,
    stops: 0,
    cabinClass: "Business",
    seatsAvailable: 8,
  },
];

export default function FlightsPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  const { data: apiFlights, isLoading: flightsLoading, error: flightsError } = useQuery({
    queryKey: ["flights", origin, destination, date, passengers, cabinClass],
    queryFn: async () => {
      const res = await apiClient.post("/flights/search", {
        origin,
        destination,
        departureDate: date,
        adults: Number(passengers),
        travelClass: cabinClass.toUpperCase(),
      });
      return res.data;
    },
    enabled: searched,
    retry: false,
  });

  const rawFlights: any[] = apiFlights?.data || (searched ? fallbackFlights : []);
  const flights: Flight[] = rawFlights.map((f) =>
    // Already in fallback shape (has departureTime directly)
    f.departure?.time !== undefined
      ? {
          id: f.id,
          airline: f.airline,
          airlineLogo: f.airline,
          flightNumber: f.flightNumber,
          origin: f.departure.airport,
          originCode: f.departure.airport,
          destination: f.arrival.airport,
          destinationCode: f.arrival.airport,
          departureTime: new Date(f.departure.time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }),
          arrivalTime: new Date(f.arrival.time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }),
          duration: f.duration.replace("PT", "").replace("H", "h ").replace("M", "m").trim(),
          price: f.price?.amount ?? 0,
          stops: f.stops,
          cabinClass: cabinClass,
          seatsAvailable: f.seatsAvailable ?? 0,
        }
      : f
  );

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    if (sortBy === "departure") return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Search Flights
          </h1>
          <p className="mt-2 text-lg text-white/70">
            Find the best fares for your journey
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                From
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rotate-[-45deg] text-gray-400" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Origin"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex items-end justify-center lg:col-span-1 lg:items-center lg:pt-5">
              <button
                onClick={() => {
                  const temp = origin;
                  setOrigin(destination);
                  setDestination(temp);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-50 hover:text-navy"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
            <div className="lg:col-span-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destination"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Passengers & Class
              </label>
              <div className="flex gap-2">
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="input-field w-20"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="input-field flex-1"
                >
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="btn-gold w-full justify-center py-3"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {!searched ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-md">
            <Plane className="mx-auto h-16 w-16 text-gray-200" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Search for Flights
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Enter your travel details above to find available flights
            </p>
          </div>
        ) : flightsLoading ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-md">
            <Plane className="mx-auto h-16 w-16 animate-pulse text-gold" />
            <p className="mt-4 text-lg font-semibold text-navy">Searching flights...</p>
            <p className="mt-1 text-sm text-gray-500">Fetching live results from airlines</p>
          </div>
        ) : flightsError ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-md">
            <p className="text-lg font-semibold text-red-600">Failed to fetch flights</p>
            <p className="mt-2 text-sm text-gray-500">Please try again or check your search details</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-navy">
                  {sortedFlights.length} flights
                </span>{" "}
                found
              </p>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/10 text-sm font-bold text-navy">
                          {flight.airlineLogo}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy">
                            {flight.airline}
                          </p>
                          <p className="text-xs text-gray-400">
                            {flight.flightNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="sm:col-span-5">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-navy">
                            {flight.departureTime}
                          </p>
                          <p className="text-xs font-medium text-gray-500">
                            {flight.originCode}
                          </p>
                        </div>
                        <div className="flex-1 px-4">
                          <div className="text-center text-[10px] text-gray-400">
                            {flight.duration}
                          </div>
                          <div className="relative my-1">
                            <div className="h-px bg-gray-300" />
                            <Plane className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-sky" />
                          </div>
                          <div className="text-center text-[10px] text-gray-400">
                            {flight.stops === 0
                              ? "Non-stop"
                              : `${flight.stops} stop`}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-navy">
                            {flight.arrivalTime}
                          </p>
                          <p className="text-xs font-medium text-gray-500">
                            {flight.destinationCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="sm:col-span-2">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-background px-2 py-0.5 text-gray-600">
                          {flight.cabinClass}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Luggage className="h-3 w-3" />
                          15kg
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] text-green-600">
                        {flight.seatsAvailable} seats left
                      </p>
                    </div>

                    {/* Price + Book */}
                    <div className="text-right sm:col-span-3">
                      <p className="text-2xl font-bold text-gold">
                        ₹{flight.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-gray-400">per person</p>
                      <Link
                        href={`/booking/${flight.id}?type=flight`}
                        className="btn-gold mt-2 px-5 py-2 text-xs"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

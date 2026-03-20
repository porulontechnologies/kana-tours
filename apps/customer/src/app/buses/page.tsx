"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import Link from "next/link";
import {
  Bus,
  MapPin,
  Calendar,
  Search,
  Clock,
  Star,
  Wifi,
  Plug,
  ArrowRight,
  Filter,
  ArrowLeftRight,
} from "lucide-react";

interface BusResult {
  id: string;
  operator: string;
  busType: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  seatsAvailable: number;
  amenities: string[];
}

const fallbackBuses: BusResult[] = [
  {
    id: "b1",
    operator: "SRS Travels",
    busType: "AC Sleeper",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "21:00",
    arrivalTime: "05:30",
    duration: "8h 30m",
    price: 899,
    rating: 4.5,
    seatsAvailable: 18,
    amenities: ["WiFi", "Charging Point", "Blanket"],
  },
  {
    id: "b2",
    operator: "VRL Travels",
    busType: "AC Semi-Sleeper",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "22:30",
    arrivalTime: "06:00",
    duration: "7h 30m",
    price: 749,
    rating: 4.3,
    seatsAvailable: 25,
    amenities: ["Charging Point", "Water Bottle"],
  },
  {
    id: "b3",
    operator: "KPN Travels",
    busType: "Volvo Multi-Axle",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "23:00",
    arrivalTime: "06:30",
    duration: "7h 30m",
    price: 1099,
    rating: 4.7,
    seatsAvailable: 12,
    amenities: ["WiFi", "Charging Point", "Blanket", "Snacks"],
  },
  {
    id: "b4",
    operator: "Orange Travels",
    busType: "AC Sleeper",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "20:30",
    arrivalTime: "04:30",
    duration: "8h 00m",
    price: 649,
    rating: 4.1,
    seatsAvailable: 32,
    amenities: ["Charging Point"],
  },
  {
    id: "b5",
    operator: "Greenline Travels",
    busType: "Luxury AC Sleeper",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "21:30",
    arrivalTime: "05:00",
    duration: "7h 30m",
    price: 1299,
    rating: 4.8,
    seatsAvailable: 6,
    amenities: ["WiFi", "Charging Point", "Blanket", "Snacks", "Entertainment"],
  },
];

export default function BusesPage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [busTypeFilter, setBusTypeFilter] = useState("");

  const { data: apiBuses } = useQuery({
    queryKey: ["buses", source, destination, date],
    queryFn: async () => {
      const res = await apiClient.get("/buses", {
        params: { source, destination, date },
      });
      return res.data;
    },
    enabled: searched,
    retry: false,
  });

  const buses: BusResult[] = apiBuses?.data || (searched ? fallbackBuses : []);

  const filteredBuses = buses
    .filter((b) => !busTypeFilter || b.busType.includes(busTypeFilter))
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "departure") return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Bus Booking
          </h1>
          <p className="mt-2 text-lg text-white/70">
            Comfortable bus travel at the best prices
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Source city"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex items-end justify-center lg:items-center lg:pt-5">
              <button
                onClick={() => {
                  const temp = source;
                  setSource(destination);
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
                Travel Date
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
            <div className="flex items-end">
              <button
                onClick={() => setSearched(true)}
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
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {!searched ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-md">
            <Bus className="mx-auto h-16 w-16 text-gray-200" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Search for Buses
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Enter your source, destination, and travel date to find buses
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-navy">
                  {filteredBuses.length} buses
                </span>{" "}
                available
              </p>
              <div className="flex items-center gap-3">
                <select
                  value={busTypeFilter}
                  onChange={(e) => setBusTypeFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Semi-Sleeper">Semi-Sleeper</option>
                  <option value="Volvo">Volvo</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Rating: Best First</option>
                  <option value="departure">Departure: Earliest</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      {/* Operator Info */}
                      <div>
                        <h3 className="text-lg font-bold text-navy">
                          {bus.operator}
                        </h3>
                        <p className="text-xs text-gray-500">{bus.busType}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <span className="flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                            <Star className="h-3 w-3 fill-current" />
                            {bus.rating}
                          </span>
                        </div>
                      </div>

                      {/* Time & Route */}
                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-navy">
                            {bus.departureTime}
                          </p>
                          <p className="text-xs text-gray-500">{bus.source || source || "Source"}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-gray-400">
                            {bus.duration}
                          </span>
                          <div className="my-1 flex items-center">
                            <div className="h-px w-16 bg-gray-300" />
                            <ArrowRight className="h-4 w-4 text-sky" />
                          </div>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-navy">
                            {bus.arrivalTime}
                          </p>
                          <p className="text-xs text-gray-500">
                            {bus.destination || destination || "Destination"}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gold">
                          ₹{bus.price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-400">per seat</p>
                        <Link
                          href={`/booking/${bus.id}?type=bus`}
                          className="btn-gold mt-2 px-5 py-2 text-xs"
                        >
                          Select Seat
                        </Link>
                      </div>
                    </div>

                    {/* Amenities & Seats */}
                    <div className="mt-4 flex flex-wrap items-center justify-between border-t pt-3">
                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.map((a) => (
                          <span
                            key={a}
                            className="flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-gray-600"
                          >
                            {a === "WiFi" && <Wifi className="h-3 w-3" />}
                            {a === "Charging Point" && (
                              <Plug className="h-3 w-3" />
                            )}
                            {a}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          bus.seatsAvailable < 10
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {bus.seatsAvailable} seats available
                      </span>
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

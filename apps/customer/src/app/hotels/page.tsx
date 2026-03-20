"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
  MapPin,
  Star,
  Search,
  Calendar,
  Users,
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  starRating: number;
  amenities: string[];
  featured: boolean;
}

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Parking: Car,
  Restaurant: UtensilsCrossed,
  Gym: Dumbbell,
  Pool: Waves,
};

const fallbackHotels: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Palace Resort",
    city: "Jaipur",
    address: "Civil Lines, Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 342,
    pricePerNight: 8999,
    starRating: 5,
    amenities: ["WiFi", "Pool", "Restaurant", "Parking", "Gym"],
    featured: true,
  },
  {
    id: "h2",
    name: "Ocean View Beach Hotel",
    city: "Goa",
    address: "Calangute Beach Road, North Goa",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 218,
    pricePerNight: 6499,
    starRating: 4,
    amenities: ["WiFi", "Pool", "Restaurant", "Parking"],
    featured: true,
  },
  {
    id: "h3",
    name: "Mountain Mist Retreat",
    city: "Manali",
    address: "Old Manali Road, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    pricePerNight: 5999,
    starRating: 4,
    amenities: ["WiFi", "Restaurant", "Parking"],
    featured: false,
  },
  {
    id: "h4",
    name: "Lakeside Heritage Inn",
    city: "Udaipur",
    address: "Lake Pichola Road, Udaipur",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 98,
    pricePerNight: 12999,
    starRating: 5,
    amenities: ["WiFi", "Pool", "Restaurant", "Parking", "Gym"],
    featured: true,
  },
  {
    id: "h5",
    name: "City Central Business Hotel",
    city: "Mumbai",
    address: "Andheri East, Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 467,
    pricePerNight: 4999,
    starRating: 3,
    amenities: ["WiFi", "Restaurant", "Gym"],
    featured: false,
  },
  {
    id: "h6",
    name: "Backwater Bliss Resort",
    city: "Alleppey",
    address: "Punnamada, Alleppey, Kerala",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 189,
    pricePerNight: 7999,
    starRating: 4,
    amenities: ["WiFi", "Pool", "Restaurant", "Parking"],
    featured: true,
  },
];

export default function HotelsPage() {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [priceSort, setPriceSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: apiHotels } = useQuery({
    queryKey: ["hotels", city, checkIn, checkOut, guests, currentPage],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: String(currentPage),
        limit: String(itemsPerPage),
      };
      if (city) params.city = city;
      if (checkIn) params.checkIn = checkIn;
      if (checkOut) params.checkOut = checkOut;
      if (guests) params.guests = guests;
      const res = await apiClient.get("/hotels", { params });
      return res.data;
    },
    retry: false,
  });

  const rawHotels: any[] = apiHotels?.data || fallbackHotels;
  const hotels: Hotel[] = rawHotels.map((h) =>
    h.images !== undefined
      ? {
          id: h.id,
          name: h.name,
          city: h.city,
          address: h.address,
          image: h.images?.[0] || "",
          rating: 0,
          reviewCount: 0,
          pricePerNight: h.pricePerNight,
          starRating: h.starRating ?? 3,
          amenities: h.amenities || [],
          featured: false,
        }
      : h
  );

  const filteredHotels = hotels
    .filter((h) => {
      if (starFilter && h.starRating !== starFilter) return false;
      if (city && !h.city.toLowerCase().includes(city.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (priceSort === "asc") return a.pricePerNight - b.pricePerNight;
      if (priceSort === "desc") return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const displayedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Find Your Perfect Stay
          </h1>
          <p className="mt-2 text-lg text-white/70">
            Browse handpicked hotels across top destinations
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Where to stay?"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Check-in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Check-out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input-field pl-10"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setCurrentPage(1)}
                className="btn-gold w-full justify-center py-3"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              Star Rating:
            </span>
            {[3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setStarFilter(starFilter === s ? null : s)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  starFilter === s
                    ? "bg-gold text-white"
                    : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
                }`}
              >
                {s} <Star className="h-3 w-3 fill-current" />
              </button>
            ))}
          </div>
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {displayedHotels.length === 0 ? (
          <div className="rounded-xl bg-white py-16 text-center shadow-md">
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No hotels found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedHotels.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
                className="card group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {hotel.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-0.5">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-gold text-gold"
                      />
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-sky" />
                    {hotel.city} &middot; {hotel.address}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-navy group-hover:text-sky transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity) => {
                      const Icon = amenityIcons[amenity];
                      return (
                        <span
                          key={amenity}
                          className="flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-gray-600"
                        >
                          {Icon && <Icon className="h-3 w-3" />}
                          {amenity}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-3">
                    <div>
                      <span className="text-[10px] uppercase text-gray-400">
                        Per Night
                      </span>
                      <p className="text-xl font-bold text-gold">
                        ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-navy/5 px-2.5 py-1">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      <span className="text-sm font-bold text-navy">
                        {hotel.rating}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({hotel.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-navy text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

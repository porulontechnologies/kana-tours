"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
  MapPin,
  Clock,
  Star,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";

interface TourPackage {
  id: string;
  slug: string;
  name: string;
  destination: string;
  coverImage: string | null;
  images?: string[];
  price: number;
  duration: number;
  nights?: number;
  rating?: number;
  reviewCount?: number;
  category: string;
  maxGroupSize: number;
  shortDescription?: string | null;
}

const categories = [
  "All",
  "Adventure",
  "Beach",
  "Cultural",
  "Hill Station",
  "Wildlife",
  "Honeymoon",
  "Family",
  "Pilgrimage",
];

const durations = [
  { label: "Any Duration", value: "" },
  { label: "1-3 Days", value: "1-3" },
  { label: "4-6 Days", value: "4-6" },
  { label: "7-10 Days", value: "7-10" },
  { label: "10+ Days", value: "10+" },
];

const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Under ₹10,000", value: "0-10000" },
  { label: "₹10,000 - ₹25,000", value: "10000-25000" },
  { label: "₹25,000 - ₹50,000", value: "25000-50000" },
  { label: "Above ₹50,000", value: "50000+" },
];

const fallbackTours: TourPackage[] = [
  {
    id: "1",
    slug: "kerala-backwaters",
    name: "Kerala Backwaters Paradise",
    destination: "Kerala, India",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    price: 24999,
    duration: 5,
    nights: 4,
    rating: 4.8,
    reviewCount: 124,
    category: "Beach",
    maxGroupSize: 15,
    shortDescription: "Experience the serene beauty of Kerala backwaters on a luxury houseboat.",
  },
  {
    id: "2",
    slug: "rajasthan-royal",
    name: "Royal Rajasthan Explorer",
    destination: "Rajasthan, India",
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
    price: 32999,
    duration: 7,
    nights: 6,
    rating: 4.9,
    reviewCount: 89,
    category: "Cultural",
    maxGroupSize: 20,
    shortDescription: "Discover the majestic forts and palaces of Rajasthan.",
  },
  {
    id: "3",
    slug: "goa-beaches",
    name: "Goa Beach Getaway",
    destination: "Goa, India",
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    price: 18999,
    duration: 4,
    nights: 3,
    rating: 4.7,
    reviewCount: 203,
    category: "Beach",
    maxGroupSize: 12,
    shortDescription: "Sun, sand, and vibrant nightlife in India's beach paradise.",
  },
  {
    id: "4",
    slug: "himachal-adventure",
    name: "Himachal Mountain Adventure",
    destination: "Himachal Pradesh, India",
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
    price: 27999,
    duration: 6,
    nights: 5,
    rating: 4.6,
    reviewCount: 156,
    category: "Adventure",
    maxGroupSize: 10,
    shortDescription: "Trekking and adventure in the stunning Himalayan mountains.",
  },
  {
    id: "5",
    slug: "andaman-islands",
    name: "Andaman Island Escape",
    destination: "Andaman & Nicobar",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    price: 35999,
    duration: 6,
    nights: 5,
    rating: 4.9,
    reviewCount: 78,
    category: "Beach",
    maxGroupSize: 8,
    shortDescription: "Crystal clear waters and pristine beaches of the Andaman Islands.",
  },
  {
    id: "6",
    slug: "kashmir-valley",
    name: "Kashmir Valley Dream",
    destination: "Kashmir, India",
    coverImage: "https://images.unsplash.com/photo-1597074866923-dc0589150458?w=600&h=400&fit=crop",
    price: 29999,
    duration: 5,
    nights: 4,
    rating: 4.8,
    reviewCount: 112,
    category: "Hill Station",
    maxGroupSize: 15,
    shortDescription: "Explore the paradise on earth with stunning valleys and lakes.",
  },
  {
    id: "7",
    slug: "jim-corbett-wildlife",
    name: "Jim Corbett Wildlife Safari",
    destination: "Uttarakhand, India",
    coverImage: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop",
    price: 22999,
    duration: 4,
    nights: 3,
    rating: 4.5,
    reviewCount: 95,
    category: "Wildlife",
    maxGroupSize: 6,
    shortDescription: "Thrilling wildlife safari in India's oldest national park.",
  },
  {
    id: "8",
    slug: "manali-honeymoon",
    name: "Manali Honeymoon Special",
    destination: "Manali, India",
    coverImage: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&h=400&fit=crop",
    price: 21999,
    duration: 5,
    nights: 4,
    rating: 4.7,
    reviewCount: 187,
    category: "Honeymoon",
    maxGroupSize: 2,
    shortDescription: "A romantic mountain escape in the heart of Himachal Pradesh.",
  },
  {
    id: "9",
    slug: "varanasi-spiritual",
    name: "Varanasi Spiritual Journey",
    destination: "Varanasi, India",
    coverImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop",
    price: 15999,
    duration: 3,
    nights: 2,
    rating: 4.6,
    reviewCount: 134,
    category: "Pilgrimage",
    maxGroupSize: 20,
    shortDescription: "Discover the spiritual heart of India along the sacred Ganges.",
  },
];

const SORT_OPTIONS = [
  { label: "Sort: Recommended", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Duration: Short to Long", value: "duration_asc" },
];

function matchesPrice(price: number, range: string): boolean {
  if (!range) return true;
  if (range === "0-10000") return price < 10000;
  if (range === "10000-25000") return price >= 10000 && price <= 25000;
  if (range === "25000-50000") return price >= 25000 && price <= 50000;
  if (range === "50000+") return price > 50000;
  return true;
}

function matchesDuration(duration: number, range: string): boolean {
  if (!range) return true;
  if (range === "1-3") return duration >= 1 && duration <= 3;
  if (range === "4-6") return duration >= 4 && duration <= 6;
  if (range === "7-10") return duration >= 7 && duration <= 10;
  if (range === "10+") return duration > 10;
  return true;
}

function sortTours(tours: TourPackage[], sortBy: string): TourPackage[] {
  if (!sortBy) return tours;
  const arr = [...tours];
  if (sortBy === "price_asc") return arr.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") return arr.sort((a, b) => b.price - a.price);
  if (sortBy === "rating_desc") return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  if (sortBy === "duration_asc") return arr.sort((a, b) => a.duration - b.duration);
  return arr;
}

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  const { data: apiTours } = useQuery({
    queryKey: ["packages", selectedCategory, selectedPrice, selectedDuration, selectedSort, currentPage],
    queryFn: async () => {
      const params: Record<string, string> = { page: String(currentPage), limit: String(itemsPerPage) };
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (selectedPrice) params.priceRange = selectedPrice;
      if (selectedDuration) params.duration = selectedDuration;
      if (selectedSort) params.sortBy = selectedSort;
      const res = await apiClient.get("/packages", { params });
      return res.data;
    },
    retry: false,
  });

  const tours: TourPackage[] = apiTours?.data || fallbackTours;

  const filteredTours = sortTours(
    tours.filter((tour) => {
      const matchesSearch =
        !searchQuery ||
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tour.category === selectedCategory;
      return matchesSearch && matchesCategory && matchesPrice(tour.price, selectedPrice) && matchesDuration(tour.duration, selectedDuration);
    }),
    selectedSort
  );

  const totalPages = apiTours?.meta?.totalPages || Math.ceil(filteredTours.length / itemsPerPage);
  const displayedTours = apiTours?.data
    ? filteredTours
    : filteredTours.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPrice, selectedDuration, selectedSort, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Tour Packages
          </h1>
          <p className="mt-2 text-lg text-white/70">
            Discover our curated collection of travel experiences
          </p>
          {/* Search Bar */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours by name or destination..."
              className="w-full rounded-xl bg-white py-3.5 pl-12 pr-4 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-sm font-medium text-navy lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } mb-8 lg:col-span-1 lg:block`}
          >
            <div className="sticky top-20 space-y-6 rounded-xl bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-bold text-navy">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedPrice("");
                    setSelectedDuration("");
                    setSelectedSort("");
                  }}
                  className="text-xs text-sky hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Category */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-navy text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.value}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={selectedPrice === range.value}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="h-4 w-4 text-navy accent-navy"
                      />
                      <span className="text-sm text-gray-600">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  Duration
                </h4>
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <label
                      key={dur.value}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="duration"
                        value={dur.value}
                        checked={selectedDuration === dur.value}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="h-4 w-4 text-navy accent-navy"
                      />
                      <span className="text-sm text-gray-600">
                        {dur.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Tour Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-navy">
                  {displayedTours.length}
                </span>{" "}
                tours
              </p>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {displayedTours.length === 0 ? (
              <div className="rounded-xl bg-white py-16 text-center shadow-md">
                <Search className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                  No tours found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedPrice("");
                    setSelectedDuration("");
                    setSelectedSort("");
                    setSearchQuery("");
                  }}
                  className="btn-outline mt-6"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {displayedTours.map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/tours/${tour.slug}`}
                    className="card group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tour.coverImage || tour.images?.[0] || ""}
                        alt={tour.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {tour.category}
                      </span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy">
                        <Clock className="h-3.5 w-3.5" />
                        {tour.duration} Days{tour.nights != null ? ` / ${tour.nights} Nights` : ""}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5 text-gold" />
                        {tour.destination}
                      </div>
                      <h3 className="mt-1.5 font-bold text-navy group-hover:text-sky transition-colors">
                        {tour.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {tour.shortDescription}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t pt-3">
                        <div>
                          <span className="text-[10px] uppercase text-gray-400">
                            From
                          </span>
                          <p className="text-lg font-bold text-gold">
                            ₹{tour.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="text-right">
                          {tour.rating != null && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                              <span className="text-sm font-semibold">
                                {tour.rating}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Users className="h-3 w-3" />
                            Max {tour.maxGroupSize}
                          </div>
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? "bg-navy text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

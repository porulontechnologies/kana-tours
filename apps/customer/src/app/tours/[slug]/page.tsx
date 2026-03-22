"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Share2,
  Heart,
  ArrowLeft,
  ImageIcon,
} from "lucide-react";
import ReviewSection from "@/components/reviews/ReviewSection";

interface Itinerary {
  day: number;
  title: string;
  description: string;
  meals: string;
  accommodation: string;
}

interface TourDetail {
  id: string;
  slug: string;
  title: string;
  destination: string;
  images: string[];
  price: number;
  discountedPrice?: number;
  duration: string;
  rating: number;
  reviewCount: number;
  category: string;
  groupSize: number;
  description: string;
  highlights: string[];
  itinerary: Itinerary[];
  inclusions: string[];
  exclusions: string[];
  startDates: string[];
}

const fallbackTour: TourDetail = {
  id: "1",
  slug: "kerala-backwaters",
  title: "Kerala Backwaters Paradise",
  destination: "Kerala, India",
  images: [
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1609340667738-63a30a2528be?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=500&fit=crop",
  ],
  price: 24999,
  duration: "5 Days / 4 Nights",
  rating: 4.8,
  reviewCount: 124,
  category: "Beach",
  groupSize: 15,
  description:
    "Embark on a mesmerizing journey through Kerala's enchanting backwaters. Cruise on a traditional houseboat through palm-fringed canals, witness stunning sunsets over Vembanad Lake, explore spice plantations in the Western Ghats, and rejuvenate with authentic Ayurvedic treatments. This tour offers the perfect blend of relaxation and cultural immersion in God's Own Country.",
  highlights: [
    "Overnight stay on a luxury houseboat",
    "Visit to Munnar tea plantations",
    "Kathakali dance performance",
    "Ayurvedic spa experience",
    "Periyar Wildlife Sanctuary visit",
    "Alleppey beach sunset",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Kochi",
      description:
        "Arrive at Cochin International Airport. Transfer to your hotel. Evening visit to Fort Kochi to explore the Chinese fishing nets and colonial architecture. Enjoy a welcome dinner featuring authentic Kerala cuisine.",
      meals: "Dinner",
      accommodation: "4-star hotel in Kochi",
    },
    {
      day: 2,
      title: "Kochi to Munnar",
      description:
        "Drive through scenic winding roads to Munnar. Stop at Cheeyappara and Valara waterfalls. Visit a tea museum and stroll through the lush tea gardens. Enjoy panoramic views of the Western Ghats.",
      meals: "Breakfast, Lunch, Dinner",
      accommodation: "Mountain resort in Munnar",
    },
    {
      day: 3,
      title: "Munnar Exploration",
      description:
        "Full-day exploration of Munnar. Visit Eravikulam National Park (home to the Nilgiri Tahr), Top Station for breathtaking views, Mattupetty Dam, and local spice plantations. Evening at leisure.",
      meals: "Breakfast, Lunch, Dinner",
      accommodation: "Mountain resort in Munnar",
    },
    {
      day: 4,
      title: "Munnar to Alleppey Houseboat",
      description:
        "Drive to Alleppey and board your luxury houseboat. Cruise through the stunning backwater canals, passing village scenes and lush paddy fields. Enjoy freshly prepared seafood on board. Watch the sunset over the backwaters.",
      meals: "Breakfast, Lunch, Dinner",
      accommodation: "Premium houseboat",
    },
    {
      day: 5,
      title: "Departure",
      description:
        "Disembark from the houseboat after breakfast. Visit Alleppey beach for a morning stroll. Transfer to Cochin Airport for your departure. Carry home memories of a lifetime.",
      meals: "Breakfast",
      accommodation: "N/A",
    },
  ],
  inclusions: [
    "Accommodation in 4-star hotels and premium houseboat",
    "Daily breakfast and selected meals as per itinerary",
    "Airport transfers and all inter-city transportation",
    "Professional English-speaking tour guide",
    "Entrance fees to all monuments and parks",
    "Houseboat cruise with all meals",
    "Tea plantation and spice garden visits",
    "Travel insurance coverage",
  ],
  exclusions: [
    "International or domestic airfare",
    "Personal expenses and tips",
    "Meals not mentioned in the itinerary",
    "Camera fees at monuments",
    "Adventure activities and optional excursions",
    "GST (5%) on total tour cost",
  ],
  startDates: ["2025-01-15", "2025-02-01", "2025-02-15", "2025-03-01"],
};

export default function TourDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeImage, setActiveImage] = useState(0);
  const [openDays, setOpenDays] = useState<number[]>([0]);
  const [liked, setLiked] = useState(false);

  const { data: apiTour } = useQuery({
    queryKey: ["package", slug],
    queryFn: async () => {
      const res = await apiClient.get(`/packages/${slug}`);
      return res.data;
    },
    retry: false,
  });

  function mapPackage(pkg: any): TourDetail {
    return {
      id: pkg.id,
      slug: pkg.slug,
      title: pkg.name,
      destination: pkg.destination,
      images: pkg.images?.length ? pkg.images : fallbackTour.images,
      price: pkg.price,
      discountedPrice: pkg.discountedPrice ?? undefined,
      duration: `${pkg.duration} Day${pkg.duration !== 1 ? "s" : ""} / ${pkg.nights} Night${pkg.nights !== 1 ? "s" : ""}`,
      rating: 0,
      reviewCount: 0,
      category: pkg.category,
      groupSize: pkg.maxGroupSize,
      description: pkg.description,
      highlights: Array.isArray(pkg.inclusions) ? pkg.inclusions.slice(0, 6) : [],
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      startDates: (pkg.startDates || []).map((d: string) =>
        new Date(d).toISOString().split("T")[0]
      ),
    };
  }

  const tour: TourDetail = apiTour?.data ? mapPackage(apiTour.data) : fallbackTour;

  const toggleDay = (index: number) => {
    setOpenDays((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy">Home</Link>
            <span>/</span>
            <Link href="/tours" className="hover:text-navy">Tours</Link>
            <span>/</span>
            <span className="text-navy font-medium">{tour.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/tours"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tours
        </Link>

        {/* Image Gallery */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96 lg:h-[480px]">
              <img
                src={tour.images[activeImage]}
                alt={tour.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
                    liked
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {tour.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                    activeImage === i
                      ? "ring-2 ring-gold ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-1 text-xs uppercase text-gray-400">
                Starting from
              </div>
              {tour.discountedPrice ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gold">
                      ₹{tour.discountedPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-500">/ person</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      ₹{tour.price.toLocaleString("en-IN")}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      {Math.round((1 - tour.discountedPrice / tour.price) * 100)}% OFF
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gold">
                    ₹{tour.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-500">/ person</span>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-5 w-5 text-sky" />
                  <div>
                    <p className="font-medium text-gray-800">{tour.duration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-5 w-5 text-sky" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Max {tour.groupSize} people
                    </p>
                    <p className="text-xs text-gray-500">Group Size</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-sky" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {tour.destination}
                    </p>
                    <p className="text-xs text-gray-500">Destination</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="h-5 w-5 fill-gold text-gold" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {tour.rating} ({tour.reviewCount} reviews)
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-medium text-gray-500">
                  Select Travel Date
                </label>
                <select className="input-field">
                  <option value="">Choose a date</option>
                  {tour.startDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-medium text-gray-500">
                  Number of Travelers
                </label>
                <select className="input-field">
                  {Array.from({ length: tour.groupSize }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Traveler" : "Travelers"}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                href={`/booking/${tour.id}`}
                className="btn-gold mt-6 w-full justify-center py-4 text-base"
              >
                Book Now
              </Link>
              <p className="mt-3 text-center text-xs text-gray-400">
                No payment required to reserve
              </p>
            </div>
          </div>
        </div>

        {/* Tour Info */}
        <div className="mt-10 lg:pr-[33.333%]">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">
            {tour.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gold" />
              {tour.destination}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-sky" />
              {tour.duration}
            </span>
            <span className="rounded-full bg-navy/10 px-3 py-0.5 text-xs font-medium text-navy">
              {tour.category}
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            {tour.description}
          </p>

          {/* Highlights */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-navy">Tour Highlights</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Star className="mt-0.5 h-4 w-4 flex-shrink-0 fill-gold text-gold" />
                  <span className="text-sm text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-navy">
              Day-by-Day Itinerary
            </h2>
            <div className="mt-4 space-y-3">
              {tour.itinerary.map((day, index) => (
                <div
                  key={day.day}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <button
                    onClick={() => toggleDay(index)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                        D{day.day}
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy">{day.title}</h4>
                        <p className="text-xs text-gray-500">
                          Meals: {day.meals}
                        </p>
                      </div>
                    </div>
                    {openDays.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {openDays.includes(index) && (
                    <div className="border-t bg-gray-50/50 px-4 py-4 pl-[4.25rem]">
                      <p className="text-sm leading-relaxed text-gray-700">
                        {day.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Meals: {day.meals}
                        </span>
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-3.5 w-3.5" />
                          Stay: {day.accommodation}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions / Exclusions */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-green-800">
                <Check className="h-5 w-5" />
                Inclusions
              </h3>
              <ul className="mt-4 space-y-3">
                {tour.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-red-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-red-800">
                <X className="h-5 w-5" />
                Exclusions
              </h3>
              <ul className="mt-4 space-y-3">
                {tour.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    <span className="text-sm text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ReviewSection targetType="TOUR_PACKAGE" targetId={tour.id} />
      </div>
    </div>
  );
}

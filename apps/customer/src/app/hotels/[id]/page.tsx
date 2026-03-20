"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  Wind,
  Tv,
  Coffee,
  ShieldCheck,
  Phone,
  ArrowLeft,
  Check,
  Users,
  BedDouble,
} from "lucide-react";
import ReviewSection from "@/components/reviews/ReviewSection";

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  bedType: string;
  amenities: string[];
  image: string;
}

interface HotelDetail {
  id: string;
  name: string;
  city: string;
  address: string;
  images: string[];
  rating: number;
  reviewCount: number;
  starRating: number;
  description: string;
  amenities: string[];
  rooms: RoomType[];
  policies: string[];
  checkInTime: string;
  checkOutTime: string;
}

const amenityIconMap: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Parking: Car,
  Restaurant: UtensilsCrossed,
  Gym: Dumbbell,
  Pool: Waves,
  "Air Conditioning": Wind,
  TV: Tv,
  "Room Service": Coffee,
  Security: ShieldCheck,
  "24/7 Front Desk": Phone,
};

const fallbackHotel: HotelDetail = {
  id: "h1",
  name: "The Grand Palace Resort",
  city: "Jaipur",
  address: "Civil Lines, Jaipur, Rajasthan 302006",
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=500&fit=crop",
  ],
  rating: 4.8,
  reviewCount: 342,
  starRating: 5,
  description:
    "Experience royal hospitality at The Grand Palace Resort, nestled in the heart of Jaipur. This magnificent five-star property combines traditional Rajasthani architecture with modern luxury. Enjoy world-class dining, a stunning infinity pool, and impeccable service that makes every guest feel like royalty. Located minutes from major attractions including Hawa Mahal and City Palace.",
  amenities: [
    "WiFi",
    "Pool",
    "Restaurant",
    "Parking",
    "Gym",
    "Air Conditioning",
    "TV",
    "Room Service",
    "Security",
    "24/7 Front Desk",
  ],
  rooms: [
    {
      id: "r1",
      name: "Deluxe Room",
      description: "Elegant room with city views, plush bedding, and modern amenities for a comfortable stay.",
      price: 8999,
      capacity: 2,
      bedType: "King Bed",
      amenities: ["WiFi", "TV", "Air Conditioning", "Room Service"],
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop",
    },
    {
      id: "r2",
      name: "Premium Suite",
      description: "Spacious suite with separate living area, palace views, and premium furnishings.",
      price: 14999,
      capacity: 3,
      bedType: "King Bed + Sofa Bed",
      amenities: ["WiFi", "TV", "Air Conditioning", "Room Service", "Balcony"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
    },
    {
      id: "r3",
      name: "Royal Palace Suite",
      description: "Our finest accommodation with panoramic views, private terrace, jacuzzi, and butler service.",
      price: 24999,
      capacity: 4,
      bedType: "2 King Beds",
      amenities: ["WiFi", "TV", "Air Conditioning", "Room Service", "Jacuzzi", "Butler"],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    },
  ],
  policies: [
    "Valid government ID required at check-in",
    "Early check-in subject to availability",
    "Pets are not allowed",
    "Smoking is prohibited in rooms",
    "Cancellation allowed up to 48 hours before check-in",
  ],
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
};

export default function HotelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeImage, setActiveImage] = useState(0);

  const { data: apiHotel } = useQuery({
    queryKey: ["hotel", id],
    queryFn: async () => {
      const res = await apiClient.get(`/hotels/id/${id}`);
      return res.data;
    },
    retry: false,
  });

  function mapHotel(h: any): HotelDetail {
    return {
      id: h.id,
      name: h.name,
      city: h.city,
      address: `${h.address}, ${h.city}, ${h.state}`,
      images: h.images?.length ? h.images : fallbackHotel.images,
      rating: 0,
      reviewCount: 0,
      starRating: h.starRating ?? 3,
      description: h.description,
      amenities: h.amenities || [],
      rooms: (h.rooms || []).map((r: any) => ({
        id: r.id,
        name: r.type,
        description: "",
        price: r.pricePerNight,
        capacity: r.capacity,
        bedType: "",
        amenities: r.amenities || [],
        image: r.images?.[0] || fallbackHotel.rooms[0].image,
      })),
      policies: [],
      checkInTime: "2:00 PM",
      checkOutTime: "11:00 AM",
    };
  }

  const hotel: HotelDetail = apiHotel?.data ? mapHotel(apiHotel.data) : fallbackHotel;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy">Home</Link>
            <span>/</span>
            <Link href="/hotels" className="hover:text-navy">Hotels</Link>
            <span>/</span>
            <span className="font-medium text-navy">{hotel.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/hotels"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Hotels
        </Link>

        {/* Gallery */}
        <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
          <div className="sm:col-span-2 sm:row-span-2">
            <div className="h-64 overflow-hidden rounded-2xl sm:h-full">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {hotel.images.slice(1, 5).map((img, i) => (
            <div key={i} className="hidden sm:block">
              <div className="h-full overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Hotel Info */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              {hotel.name}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-sky" />
              {hotel.address}
            </p>

            <p className="mt-6 text-base leading-relaxed text-gray-700">
              {hotel.description}
            </p>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-navy">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIconMap[amenity] || Check;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm"
                    >
                      <Icon className="h-5 w-5 text-sky" />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Types */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-navy">
                Available Room Types
              </h2>
              <div className="mt-4 space-y-4">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    <div className="grid sm:grid-cols-3">
                      <div className="h-48 sm:h-full">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5 sm:col-span-2">
                        <h3 className="text-lg font-bold text-navy">
                          {room.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {room.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            Up to {room.capacity} guests
                          </span>
                          <span className="flex items-center gap-1">
                            <BedDouble className="h-3.5 w-3.5" />
                            {room.bedType}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {room.amenities.map((a) => (
                            <span
                              key={a}
                              className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-gray-600"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                          <div>
                            <span className="text-xs text-gray-400">
                              Per Night
                            </span>
                            <p className="text-2xl font-bold text-gold">
                              ₹{room.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <Link
                            href={`/booking/${hotel.id}?room=${room.id}`}
                            className="btn-gold"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-navy">Hotel Policies</h2>
              <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-xs text-green-600">Check-in Time</p>
                    <p className="mt-1 text-lg font-bold text-green-800">
                      {hotel.checkInTime}
                    </p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4 text-center">
                    <p className="text-xs text-red-600">Check-out Time</p>
                    <p className="mt-1 text-lg font-bold text-red-800">
                      {hotel.checkOutTime}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {hotel.policies.map((policy, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky" />
                      {policy}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">Starting from</span>
                  <p className="text-3xl font-bold text-gold">
                    ₹{hotel.rooms[0]?.price.toLocaleString("en-IN") || "N/A"}
                  </p>
                  <span className="text-xs text-gray-500">per night</span>
                </div>
                <div className="rounded-lg bg-navy/5 px-3 py-2 text-center">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="text-lg font-bold text-navy">
                      {hotel.rating}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {hotel.reviewCount} reviews
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Check-in
                  </label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Check-out
                  </label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Guests
                  </label>
                  <select className="input-field">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>

              <Link
                href={`/booking/${hotel.id}`}
                className="btn-gold mt-6 w-full justify-center py-4 text-base"
              >
                Reserve Now
              </Link>
              <p className="mt-3 text-center text-xs text-gray-400">
                Free cancellation up to 48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ReviewSection targetType="HOTEL" targetId={hotel.id} />
      </div>
    </div>
  );
}

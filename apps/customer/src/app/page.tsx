"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSiteConfig } from "@/providers/SiteConfigProvider";
import apiClient from "@/lib/api-client";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Shield,
  Clock,
  Headphones,
  ArrowRight,
  Plane,
  Hotel,
  Bus,
  Map,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

// ─── Static content ───────────────────────────────────────────────────────────

const searchTabs = [
  { id: "tours",   label: "Tours",   icon: Map   },
  { id: "hotels",  label: "Hotels",  icon: Hotel },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "buses",   label: "Buses",   icon: Bus   },
] as const;

type SearchTab = (typeof searchTabs)[number]["id"];

const features = [
  {
    icon: Shield,
    title: "Trusted & Verified",
    description:
      "All our tours and partners are thoroughly vetted to ensure quality and safety for every traveler.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to assist you before, during, and after your trip.",
  },
  {
    icon: Star,
    title: "Best Price Guarantee",
    description:
      "We offer the most competitive pricing with no hidden fees. Find a lower price, and we will match it.",
  },
  {
    icon: Headphones,
    title: "Expert Guidance",
    description:
      "Our seasoned travel advisors craft personalized itineraries tailored to your preferences.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const siteConfig = useSiteConfig();
  const [activeTab, setActiveTab] = useState<SearchTab>("tours");
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Fetch featured tour packages from the database
  const { data: featuredRes, isLoading: toursLoading } = useQuery({
    queryKey: ["featured-packages"],
    queryFn: () =>
      apiClient
        .get("/packages", { params: { isFeatured: true, limit: 6, page: 1 } })
        .then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const featuredTours: any[] = featuredRes?.data ?? [];
  const testimonials = siteConfig.testimonials.items ?? [];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative -mt-[102px] flex min-h-[580px] items-center overflow-hidden lg:min-h-[660px]">
        <img
          src={siteConfig.hero.backgroundImage}
          alt="Travel destination"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-navy/60" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-36 sm:px-6 lg:px-8 lg:pb-36 lg:pt-44">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {siteConfig.hero.heading}
              <br />
              <span className="text-gold">{siteConfig.hero.headingHighlight}</span>
            </h1>
            <p className="mt-5 text-lg text-white/85 sm:text-xl">{siteConfig.hero.subheading}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={siteConfig.hero.primaryButtonLink} className="btn-gold px-8 py-3.5 text-base shadow-lg">
                {siteConfig.hero.primaryButtonText}
              </Link>
              <Link
                href={siteConfig.hero.secondaryButtonLink}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-navy"
              >
                {siteConfig.hero.secondaryButtonText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search Widget ─────────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex border-b border-gray-100">
              {searchTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? "border-gold text-gold"
                        : "border-transparent text-gray-500 hover:text-navy"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === "tours" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Where to?" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="date" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select className="input-field pl-10">
                        <option>1 Traveler</option>
                        <option>2 Travelers</option>
                        <option>3 Travelers</option>
                        <option>4 Travelers</option>
                        <option>5+ Travelers</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Link href="/tours" className="btn-gold w-full justify-center py-3">
                      <Search className="mr-2 h-5 w-5" />
                      Search
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "hotels" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="City or hotel" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Check-in</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Check-out</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Guests</label>
                    <select className="input-field">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Link href="/hotels" className="btn-gold w-full justify-center py-3">
                      <Search className="mr-2 h-5 w-5" />
                      Search
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "flights" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">From</label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Origin city" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Destination" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Date</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Passengers</label>
                    <select className="input-field">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4+ Passengers</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Link href="/flights" className="btn-gold w-full justify-center py-3">
                      <Search className="mr-2 h-5 w-5" />
                      Search
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "buses" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Source city" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Destination" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Travel Date</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div className="flex items-end">
                    <Link href="/buses" className="btn-gold w-full justify-center py-3">
                      <Search className="mr-2 h-5 w-5" />
                      Search
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Tour Packages ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Featured Tour Packages</h2>
          <p className="section-subtitle">Handpicked destinations for your next unforgettable adventure</p>
        </div>

        {toursLoading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : featuredTours.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white py-16 text-center shadow-md">
            <Map className="mx-auto h-12 w-12 text-gray-200" />
            <p className="mt-4 text-gray-500">No featured packages available yet.</p>
            <Link href="/tours" className="btn-outline mt-4 inline-flex">
              Browse All Tours
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTours.map((pkg: any) => {
                const image = pkg.coverImage || pkg.images?.[0] || "";
                const duration = `${pkg.duration} Day${pkg.duration !== 1 ? "s" : ""} / ${pkg.nights} Night${pkg.nights !== 1 ? "s" : ""}`;
                const displayPrice = pkg.discountedPrice ?? pkg.price;
                return (
                  <Link key={pkg.id} href={`/tours/${pkg.slug}`} className="card group">
                    <div className="relative h-52 overflow-hidden">
                      {image ? (
                        <img
                          src={image}
                          alt={pkg.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <Map className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                        <Clock className="h-3.5 w-3.5" />
                        {duration}
                      </div>
                      {pkg.discountedPrice && (
                        <div className="absolute top-3 right-3 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white">
                          {Math.round((1 - pkg.discountedPrice / pkg.price) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-gold" />
                        {pkg.destination}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-navy group-hover:text-sky transition-colors">
                        {pkg.name}
                      </h3>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-500">Starting from</span>
                          <div className="flex items-baseline gap-1.5">
                            <p className="text-xl font-bold text-gold">
                              ₹{displayPrice.toLocaleString("en-IN")}
                            </p>
                            {pkg.discountedPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ₹{pkg.price.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-medium text-navy">
                          {pkg.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <Link href="/tours" className="btn-outline">
                View All Tours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="bg-navy/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Why Choose KaNa Travels</h2>
            <p className="section-subtitle">We go above and beyond to make your travel dreams a reality</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl bg-white p-8 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <Icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={siteConfig.testimonials.backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/88" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">What Our Travelers Say</h2>
            <p className="section-subtitle">Real experiences from real travelers who explored with us</p>
          </div>

          {testimonials.length === 0 ? (
            <p className="mt-12 text-center text-gray-400 text-sm">
              Testimonials will appear here once added by the admin.
            </p>
          ) : (
            <div className="mt-12">
              {/* Desktop: up to 3 cards */}
              <div className="hidden gap-8 md:grid md:grid-cols-3">
                {testimonials.slice(0, 3).map((t) => {
                  const initials = t.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
                  return (
                    <div key={t.id} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < t.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{t.text}&rdquo;</p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy">{t.name}</p>
                          <p className="text-xs text-gray-500">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: carousel */}
              <div className="md:hidden">
                {(() => {
                  const t = testimonials[testimonialIndex];
                  const initials = t.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
                  return (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < t.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{t.text}&rdquo;</p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy">{t.name}</p>
                          <p className="text-xs text-gray-500">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={() =>
                      setTestimonialIndex((p) => (p - 1 + testimonials.length) % testimonials.length)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${i === testimonialIndex ? "bg-navy" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setTestimonialIndex((p) => (p + 1) % testimonials.length)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <img
          src={siteConfig.ctaBanner.backgroundImage}
          alt="Travel destination"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{siteConfig.ctaBanner.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{siteConfig.ctaBanner.subtext}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/tours" className="btn-gold px-8 py-4 text-base shadow-lg">
              {siteConfig.ctaBanner.primaryButtonText}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white hover:text-navy"
            >
              {siteConfig.ctaBanner.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

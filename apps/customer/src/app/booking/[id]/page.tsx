"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Phone,
  Mail,
  User,
  CreditCard,
  Shield,
  CheckCircle,
} from "lucide-react";

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  idType: string;
  idNumber: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;
  const bookingType = searchParams.get("type") || "tour";

  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [guests, setGuests] = useState<GuestDetails[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      idType: "Aadhaar",
      idNumber: "",
    },
  ]);

  const { data: bookingData } = useQuery({
    queryKey: ["booking-details", bookingId, bookingType],
    queryFn: async () => {
      const endpoint =
        bookingType === "hotel"
          ? `/hotels/${bookingId}`
          : bookingType === "flight"
          ? `/flights/${bookingId}`
          : `/packages/${bookingId}`;
      const res = await apiClient.get(endpoint);
      return res.data;
    },
    retry: false,
  });

  const updateGuest = (index: number, field: keyof GuestDetails, value: string) => {
    setGuests((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addGuest = () => {
    setGuests((prev) => [
      ...prev,
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        idType: "Aadhaar",
        idNumber: "",
      },
    ]);
    setTravelers((prev) => prev + 1);
  };

  const basePrice = bookingData?.data?.price || 24999;
  const totalPrice = basePrice * travelers;
  const gst = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + gst;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Complete Your Booking
          </h1>
          {/* Progress Steps */}
          <div className="mt-6 flex items-center gap-4">
            {["Guest Details", "Review", "Payment"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                      ? "bg-gold text-white"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {step > i + 1 ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`hidden text-sm sm:inline ${
                    step === i + 1 ? "font-semibold text-white" : "text-white/60"
                  }`}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div className="hidden h-px w-8 bg-white/30 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Area */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                {/* Trip Details */}
                <div className="rounded-xl bg-white p-6 shadow-md">
                  <h2 className="text-lg font-bold text-navy">Trip Details</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Travel Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Number of Travelers
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <select
                          value={travelers}
                          onChange={(e) =>
                            setTravelers(parseInt(e.target.value))
                          }
                          className="input-field pl-10"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Traveler" : "Travelers"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Info */}
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white p-6 shadow-md"
                  >
                    <h2 className="text-lg font-bold text-navy">
                      Guest {index + 1} Details
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={guest.firstName}
                            onChange={(e) =>
                              updateGuest(index, "firstName", e.target.value)
                            }
                            placeholder="Enter first name"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={guest.lastName}
                          onChange={(e) =>
                            updateGuest(index, "lastName", e.target.value)
                          }
                          placeholder="Enter last name"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={guest.email}
                            onChange={(e) =>
                              updateGuest(index, "email", e.target.value)
                            }
                            placeholder="email@example.com"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={guest.phone}
                            onChange={(e) =>
                              updateGuest(index, "phone", e.target.value)
                            }
                            placeholder="+91 XXXXX XXXXX"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={guest.dateOfBirth}
                          onChange={(e) =>
                            updateGuest(index, "dateOfBirth", e.target.value)
                          }
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          ID Type
                        </label>
                        <select
                          value={guest.idType}
                          onChange={(e) =>
                            updateGuest(index, "idType", e.target.value)
                          }
                          className="input-field"
                        >
                          <option>Aadhaar</option>
                          <option>Passport</option>
                          <option>Driving License</option>
                          <option>Voter ID</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          ID Number
                        </label>
                        <input
                          type="text"
                          value={guest.idNumber}
                          onChange={(e) =>
                            updateGuest(index, "idNumber", e.target.value)
                          }
                          placeholder="Enter ID number"
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {guests.length < travelers && (
                  <button
                    onClick={addGuest}
                    className="btn-outline w-full"
                  >
                    + Add Another Guest
                  </button>
                )}

                {/* Special Requests */}
                <div className="rounded-xl bg-white p-6 shadow-md">
                  <h2 className="text-lg font-bold text-navy">
                    Special Requests
                  </h2>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any dietary requirements, accessibility needs, or special requests..."
                    rows={3}
                    className="input-field mt-3"
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn-gold w-full justify-center py-4 text-base"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="rounded-xl bg-white p-6 shadow-md">
                  <h2 className="text-lg font-bold text-navy">
                    Booking Summary
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-xs text-gray-500">Travel Date</p>
                      <p className="font-semibold text-navy">
                        {travelDate
                          ? new Date(travelDate).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Not selected"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-xs text-gray-500">Travelers</p>
                      <p className="font-semibold text-navy">
                        {travelers} {travelers === 1 ? "Person" : "People"}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-6 font-semibold text-navy">
                    Guest Information
                  </h3>
                  {guests.map((guest, i) => (
                    <div
                      key={i}
                      className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-4"
                    >
                      <p className="font-medium text-navy">
                        {guest.firstName} {guest.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {guest.email} | {guest.phone}
                      </p>
                      <p className="text-xs text-gray-400">
                        {guest.idType}: {guest.idNumber}
                      </p>
                    </div>
                  ))}

                  {specialRequests && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Special Requests</p>
                      <p className="text-sm text-gray-700">{specialRequests}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-outline flex-1"
                  >
                    Back to Edit
                  </button>
                  <button
                    onClick={() => router.push(`/booking/payment?bookingId=${bookingId}&amount=${grandTotal}`)}
                    className="btn-gold flex-1 justify-center py-4 text-base"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Price Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-navy">Price Breakdown</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Base Price x {travelers}
                  </span>
                  <span className="font-medium">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-medium">
                    ₹{gst.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-green-50 p-4">
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Secure Booking
                    </p>
                    <p className="mt-1 text-xs text-green-700">
                      Your payment information is encrypted and secure. Free
                      cancellation up to 48 hours before travel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <CreditCard className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-400">
                  Razorpay | PayU | UPI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

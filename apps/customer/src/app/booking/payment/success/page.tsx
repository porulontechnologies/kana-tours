"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, Home, List } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-14 w-14 text-green-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-navy">
          Booking Confirmed!
        </h1>
        <p className="mt-3 text-gray-600">
          Your payment was successful and your booking has been confirmed. A
          confirmation email has been sent to your registered email address.
        </p>

        {bookingId && (
          <div className="mt-6 rounded-lg bg-navy/5 p-4">
            <p className="text-sm text-gray-600">Booking Reference</p>
            <p className="mt-1 font-mono text-lg font-bold text-navy">
              {bookingId.slice(0, 12).toUpperCase()}
            </p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <Link
            href="/dashboard/bookings"
            className="btn-primary flex w-full items-center justify-center gap-2"
          >
            <List className="h-4 w-4" />
            View My Bookings
          </Link>
          <Link
            href="/"
            className="btn-outline flex w-full items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Need help? Contact us at support@kanatravels.com
        </p>
      </div>
    </div>
  );
}

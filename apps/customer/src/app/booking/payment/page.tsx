"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import apiClient from "@/lib/api-client";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Shield,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

type Gateway = "RAZORPAY" | "PAYU";
type PaymentMethod = "card" | "upi" | "netbanking" | "wallet";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");

  const [gateway, setGateway] = useState<Gateway>("RAZORPAY");
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!bookingId || !amount) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
          <h2 className="mt-4 text-xl font-bold text-navy">
            Invalid Payment Link
          </h2>
          <p className="mt-2 text-gray-600">
            Missing booking or amount information.
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const parsedAmount = parseFloat(amount);

  async function initiateRazorpay(orderData: {
    gatewayOrderId: string;
    keyId: string;
    amount: number;
    currency: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      const options = {
        key: orderData.keyId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: "KaNa Travels & Holidays",
        description: `Booking #${bookingId}`,
        order_id: orderData.gatewayOrderId,
        prefill: {
          email: (session?.user as Record<string, unknown>)?.email || "",
          name: (session?.user as Record<string, unknown>)?.name || "",
        },
        theme: { color: "#1B3A5C" },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            await apiClient.post("/payments/verify", {
              gateway: "RAZORPAY",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            resolve();
          } catch {
            reject(new Error("Payment verification failed"));
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", () =>
        reject(new Error("Payment failed"))
      );
      rzp.open();
    });
  }

  async function initiatePayU(orderData: {
    gatewayOrderId: string;
    merchantKey: string;
    hash: string;
    txnId: string;
    amount: number;
  }) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://test.payu.in/_payment";

    const fields: Record<string, string> = {
      key: orderData.merchantKey,
      txnid: orderData.txnId,
      amount: orderData.amount.toString(),
      productinfo: `Booking #${bookingId}`,
      firstname: (session?.user as Record<string, unknown>)?.name as string || "Customer",
      email: (session?.user as Record<string, unknown>)?.email as string || "",
      phone: "",
      surl: `${window.location.origin}/booking/payment/success?bookingId=${bookingId}`,
      furl: `${window.location.origin}/booking/payment?bookingId=${bookingId}&amount=${amount}&error=failed`,
      hash: orderData.hash,
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  async function handlePayment() {
    setLoading(true);
    setError("");
    setPaymentStatus("processing");

    try {
      const { data } = await apiClient.post("/payments/create-order", {
        bookingId,
        gateway,
        method,
      });

      const orderData = data.data;

      if (gateway === "RAZORPAY") {
        await initiateRazorpay(orderData);
        setPaymentStatus("success");
        setTimeout(() => {
          router.push(
            `/booking/payment/success?bookingId=${bookingId}`
          );
        }, 1500);
      } else {
        await initiatePayU(orderData);
      }
    } catch (err: any) {
      setPaymentStatus("failed");
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Payment failed. Please try again."
      );
      setLoading(false);
    }
  }

  if (paymentStatus === "success") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-navy">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Your booking has been confirmed. Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="mx-auto max-w-4xl px-4">
        <Link
          href={`/booking/${bookingId}`}
          className="mb-6 inline-flex items-center gap-2 text-navy hover:text-sky"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Booking
        </Link>

        <h1 className="text-3xl font-bold text-navy">Complete Payment</h1>
        <p className="mt-1 text-gray-600">
          Choose your preferred payment method
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gateway Selection */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-navy">Payment Gateway</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGateway("RAZORPAY")}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                    gateway === "RAZORPAY"
                      ? "border-navy bg-navy/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard
                    className={`h-6 w-6 ${
                      gateway === "RAZORPAY" ? "text-navy" : "text-gray-400"
                    }`}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Razorpay</p>
                    <p className="text-xs text-gray-500">
                      Cards, UPI, Netbanking
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setGateway("PAYU")}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                    gateway === "PAYU"
                      ? "border-navy bg-navy/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard
                    className={`h-6 w-6 ${
                      gateway === "PAYU" ? "text-navy" : "text-gray-400"
                    }`}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">PayU</p>
                    <p className="text-xs text-gray-500">
                      Cards, UPI, Wallets
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-navy">Payment Method</h3>
              <div className="mt-4 space-y-3">
                {[
                  {
                    id: "upi" as const,
                    label: "UPI",
                    desc: "Google Pay, PhonePe, Paytm",
                    icon: Smartphone,
                  },
                  {
                    id: "card" as const,
                    label: "Credit / Debit Card",
                    desc: "Visa, Mastercard, RuPay",
                    icon: CreditCard,
                  },
                  {
                    id: "netbanking" as const,
                    label: "Net Banking",
                    desc: "All major banks supported",
                    icon: CreditCard,
                  },
                  {
                    id: "wallet" as const,
                    label: "Wallet",
                    desc: "Paytm, Mobikwik, Freecharge",
                    icon: CreditCard,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMethod(opt.id)}
                    className={`flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                      method === opt.id
                        ? "border-gold bg-gold/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <opt.icon
                      className={`h-5 w-5 ${
                        method === opt.id ? "text-gold" : "text-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.desc}</p>
                    </div>
                    <div
                      className={`ml-auto h-5 w-5 rounded-full border-2 ${
                        method === opt.id
                          ? "border-gold bg-gold"
                          : "border-gray-300"
                      }`}
                    >
                      {method === opt.id && (
                        <CheckCircle className="h-full w-full text-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn-gold w-full justify-center py-4 text-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                `Pay ₹${parsedAmount.toLocaleString("en-IN")}`
              )}
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-navy">Order Summary</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-mono text-xs font-medium">
                    {bookingId?.slice(0, 8)}...
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      ₹{parsedAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <p className="text-xs text-gray-600">
                    256-bit SSL encrypted payment
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <p className="text-xs text-gray-600">
                    Instant booking confirmation
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <p className="text-xs text-gray-600">
                    Free cancellation up to 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

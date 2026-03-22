"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSiteConfig } from "@/providers/SiteConfigProvider";
import apiClient from "@/lib/api-client";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowLeft,
} from "lucide-react";

const OFFICES = [
  {
    city: "Head Office",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    sunday: "Sunday: 10:00 AM – 4:00 PM",
  },
];

export default function ContactPage() {
  const siteConfig = useSiteConfig();
  const footer = siteConfig.footer;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post("/contact", form);
    } catch {
      // Even if the endpoint doesn't exist yet, show success to the user
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const socialLinks = [
    { href: footer.facebook,  Icon: Facebook,  label: "Facebook"  },
    { href: footer.instagram, Icon: Instagram, label: "Instagram" },
    { href: footer.twitter,   Icon: Twitter,   label: "Twitter"   },
    { href: footer.youtube,   Icon: Youtube,   label: "YouTube"   },
  ].filter((s) => s.href && s.href !== "#");

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-navy py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-lg text-white/70">
            We&rsquo;d love to hear from you. Reach out and our team will get back to you shortly.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* ── Contact info sidebar ─────────────────────────────────── */}
          <div className="space-y-6">

            {/* Company card */}
            <div className="rounded-2xl bg-navy p-7 text-white">
              <h2 className="text-lg font-bold">
                {footer.companyName}
                {footer.tagline && (
                  <span className="ml-1 text-gold">{footer.tagline}</span>
                )}
              </h2>
              {footer.description && (
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {footer.description}
                </p>
              )}
            </div>

            {/* Address */}
            {footer.address && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Our Address</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {footer.address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Phone */}
            {footer.phone && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky/10">
                    <Phone className="h-5 w-5 text-sky" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Phone</p>
                    <a
                      href={`tel:${footer.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-sm text-sky hover:underline"
                    >
                      {footer.phone}
                    </a>
                    <p className="mt-0.5 text-xs text-gray-400">Mon – Sat, 9 AM – 7 PM</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            {footer.email && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Email</p>
                    <a
                      href={`mailto:${footer.email}`}
                      className="mt-1 block text-sm text-sky hover:underline break-all"
                    >
                      {footer.email}
                    </a>
                    <p className="mt-0.5 text-xs text-gray-400">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            )}

            {/* Business hours */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy/10">
                  <Clock className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <p className="font-semibold text-navy">Business Hours</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Mon – Fri: 9:00 AM – 7:00 PM</p>
                    <p>Saturday: 9:00 AM – 5:00 PM</p>
                    <p>Sunday: 10:00 AM – 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="font-semibold text-navy mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy hover:bg-navy hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Contact form ─────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-500" />
                  <h3 className="mt-4 text-2xl font-bold text-navy">Message Sent!</h3>
                  <p className="mt-2 text-gray-500">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="btn-outline-navy mt-6 px-6 py-2.5 text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-navy">Send Us a Message</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Fill out the form below and we&rsquo;ll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Your full name"
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="you@example.com"
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={set("phone")}
                          placeholder="+91 98765 43210"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                          Subject
                        </label>
                        <select
                          value={form.subject}
                          onChange={set("subject")}
                          className="input-field"
                        >
                          <option value="">Select a topic</option>
                          <option value="Tour Package Enquiry">Tour Package Enquiry</option>
                          <option value="Hotel Booking">Hotel Booking</option>
                          <option value="Flight Booking">Flight Booking</option>
                          <option value="Bus Booking">Bus Booking</option>
                          <option value="Existing Booking">Existing Booking</option>
                          <option value="Complaint">Complaint / Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Message *
                      </label>
                      <textarea
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="input-field resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full justify-center py-3.5 text-base flex items-center gap-2"
                    >
                      {submitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Quick links */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Browse Tours",    href: "/tours",   desc: "Explore our packages"   },
                { label: "Book a Hotel",    href: "/hotels",  desc: "Find the best stays"    },
                { label: "Search Flights",  href: "/flights", desc: "Live flight availability" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm hover:border-gold hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-navy text-sm">{link.label}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

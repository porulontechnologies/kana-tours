"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

const quickLinks = [
  { href: "/tours", label: "Tour Packages" },
  { href: "/hotels", label: "Hotels" },
  { href: "/flights", label: "Flights" },
  { href: "/buses", label: "Bus Booking" },
  { href: "/dashboard/bookings", label: "My Bookings" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund Policy" },
];

export default function Footer() {
  const { footer } = useSiteConfig();

  const socialLinks = [
    { href: footer.facebook, icon: Facebook, label: "Facebook" },
    { href: footer.instagram, icon: Instagram, label: "Instagram" },
    { href: footer.twitter, icon: Twitter, label: "Twitter" },
    { href: footer.youtube, icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="relative text-white">
      {/* Background image */}
      <img
        src={footer.backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-900/93" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold font-bold text-white text-xl">
                {footer.companyName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold">{footer.companyName}</h3>
                <p className="text-xs text-white/60">{footer.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {footer.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <span className="text-sm text-white/70">{footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-gold" />
                <a
                  href={`tel:${footer.phone.replace(/\s/g, "")}`}
                  className="text-sm text-white/70 hover:text-gold"
                >
                  {footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-gold" />
                <a
                  href={`mailto:${footer.email}`}
                  className="text-sm text-white/70 hover:text-gold"
                >
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {footer.companyName} {footer.tagline}. All
            rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with care for travelers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

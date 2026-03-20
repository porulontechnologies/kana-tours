"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Plane,
  Hotel,
  Map,
  Bus,
  Phone,
  Mail,
} from "lucide-react";

const navLinks = [
  { href: "/",        label: "Home"    },
  { href: "/tours",   label: "Tours"   },
  { href: "/hotels",  label: "Hotels"  },
  { href: "/flights", label: "Flights" },
  { href: "/buses",   label: "Buses"   },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages, always use the solid white style
  const isGlassy = isHome && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top info bar — solid dark navy */}
      <div className="bg-navy-900/95 text-white backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-xs text-white/80">
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-gold transition-colors">
              <Phone className="h-3 w-3" />
              +91 XXXXX XXXXX
            </a>
            <a href="mailto:info@kanatravels.com" className="hidden items-center gap-1 hover:text-gold transition-colors sm:flex">
              <Mail className="h-3 w-3" />
              info@kanatravels.com
            </a>
          </div>
          <p className="text-xs text-white/60">Packages starting ₹5,071 p/n</p>
        </div>
      </div>

      {/* Main nav — glossy at top, white when scrolled */}
      <div
        className={`border-b transition-all duration-300 ${
          isGlassy
            ? "border-white/10 bg-white/10 backdrop-blur-md"
            : "border-gray-200 bg-white shadow-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[70px] items-center justify-between">

            {/* Logo image — mix-blend-multiply removes white bg */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/kana-logo.jpeg"
                alt="KaNa Travels and Holidays"
                width={160}
                height={56}
                className="h-14 w-auto object-contain"
                style={{ mixBlendMode: "multiply" }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isGlassy
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-navy hover:bg-navy/5 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth / Book Now */}
            <div className="hidden items-center gap-3 md:flex">
              {session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold ${
                      isGlassy
                        ? "border-white/30 bg-white/20 text-white backdrop-blur-sm"
                        : "border-navy/20 bg-white text-navy"
                    }`}
                  >
                    {session.user.image ? (
                      <img src={session.user.image} alt="" className="h-7 w-7 rounded-full border-2 border-gold" />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-semibold text-white">
                        {session.user.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="max-w-[100px] truncate">{session.user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl bg-white/95 py-2 shadow-xl backdrop-blur-sm ring-1 ring-black/5">
                        <div className="border-b px-4 py-3">
                          <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                          <p className="text-xs text-gray-500">{session.user.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold/5 hover:text-gold">
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                        <Link href="/dashboard/bookings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold/5 hover:text-gold">
                          <Map className="h-4 w-4" /> My Bookings
                        </Link>
                        <Link href="/dashboard/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold/5 hover:text-gold">
                          <User className="h-4 w-4" /> Profile
                        </Link>
                        <div className="border-t">
                          <button onClick={() => signOut()} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                            <LogOut className="h-4 w-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-gold-600 hover:shadow-lg"
                >
                  Book Now
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`rounded-lg border p-2 backdrop-blur-sm transition-colors md:hidden ${
                isGlassy
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-navy/20 bg-white text-navy"
              }`}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — glossy */}
      {mobileOpen && (
        <div
          className="border-b border-white/30 md:hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(240,245,255,0.93) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <div className="space-y-0.5 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center rounded-lg px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold/10 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-navy/10 pt-3">
              {session?.user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-navy hover:bg-gold/10 hover:text-gold">
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-5 w-5" /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-lg bg-gold px-4 py-3 text-sm font-bold text-white shadow">
                  Book Now
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

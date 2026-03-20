"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Plane, Bus, Building2, Map,
  CalendarCheck, ChevronLeft, ChevronRight, Percent, User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",     href: "/",         icon: <LayoutDashboard size={20} /> },
  { label: "Flights",       href: "/flights",   icon: <Plane size={20} /> },
  { label: "Buses",         href: "/buses",     icon: <Bus size={20} /> },
  { label: "Hotels",        href: "/hotels",    icon: <Building2 size={20} /> },
  { label: "Tour Packages", href: "/packages",  icon: <Map size={20} /> },
  { label: "My Bookings",   href: "/bookings",  icon: <CalendarCheck size={20} /> },
  { label: "My Commission", href: "/commission",icon: <Percent size={20} /> },
  { label: "Profile",       href: "/profile",   icon: <User size={20} /> },
];

export default function AgentSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-navy-600 text-white z-40 transition-all duration-300 flex flex-col ${collapsed ? "w-[72px]" : "w-64"}`}>
      <div className="flex items-center justify-between p-4 border-b border-navy-500">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center font-bold text-navy-900 text-sm">K</div>
            <div>
              <h1 className="text-base font-bold leading-tight">KaNa Agent</h1>
              <p className="text-[10px] text-navy-200 leading-tight">Tour Agent Portal</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center font-bold text-navy-900 text-sm mx-auto">K</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg hover:bg-navy-500 transition-colors ${collapsed ? "mx-auto mt-2" : ""}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active ? "bg-navy-500 text-gold-400" : "text-navy-100 hover:bg-navy-500/60 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={active ? "text-gold-400" : "text-navy-200"}>{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {active && <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-navy-500">
        {!collapsed ? (
          <div className="px-3 py-2 bg-navy-700 rounded-lg">
            <p className="text-[11px] text-navy-300">Agent Portal v1.0</p>
          </div>
        ) : (
          <div className="w-8 h-1 bg-navy-500 rounded mx-auto" />
        )}
      </div>
    </aside>
  );
}

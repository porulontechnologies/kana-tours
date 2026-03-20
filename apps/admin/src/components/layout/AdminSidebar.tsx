"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppearance } from "@/context/AppearanceContext";
import {
  LayoutDashboard,
  Building2,
  Map,
  CalendarCheck,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plane,
  Bus,
  Briefcase,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Hotels",
    href: "/hotels",
    icon: <Building2 size={20} />,
  },
  {
    label: "Tour Packages",
    href: "/packages",
    icon: <Map size={20} />,
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: <CalendarCheck size={20} />,
    children: [
      { label: "All Bookings", href: "/bookings", icon: <CalendarCheck size={16} /> },
      { label: "Flight Bookings", href: "/bookings/flights", icon: <Plane size={16} /> },
      { label: "Bus Bookings", href: "/bookings/buses", icon: <Bus size={16} /> },
    ],
  },
  {
    label: "Users",
    href: "/users",
    icon: <Users size={20} />,
  },
  {
    label: "Tour Agents",
    href: "/agents",
    icon: <Briefcase size={20} />,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChart3 size={20} />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useAppearance();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Bookings"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-navy-600 text-white z-40 transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-navy-500">
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center font-bold text-navy-900 text-sm">
              K
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">KaNa Admin</h1>
              <p className="text-[10px] text-navy-200 leading-tight">Travels & Holidays</p>
            </div>
          </Link>
        )}
        {sidebarCollapsed && (
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center font-bold text-navy-900 text-sm mx-auto">
            K
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`p-1.5 rounded-lg hover:bg-navy-500 transition-colors ${
            sidebarCollapsed ? "mx-auto mt-2" : ""
          }`}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={item.label}>
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-navy-500 text-gold-400"
                      : "text-navy-100 hover:bg-navy-500/60 hover:text-white"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className={active ? "text-gold-400" : "text-navy-200"}>
                    {item.icon}
                  </span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-navy-500 text-gold-400 border-l-3 border-gold-500"
                      : "text-navy-100 hover:bg-navy-500/60 hover:text-white"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className={active ? "text-gold-400" : "text-navy-200"}>
                    {item.icon}
                  </span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {active && !sidebarCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  )}
                </Link>
              )}

              {hasChildren && isExpanded && !sidebarCollapsed && (
                <div className="ml-5 mt-1 space-y-1 border-l-2 border-navy-500 pl-3">
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          childActive
                            ? "text-gold-400 bg-navy-500/50 font-medium"
                            : "text-navy-200 hover:text-white hover:bg-navy-500/30"
                        }`}
                      >
                        {child.icon}
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-navy-500">
        {!sidebarCollapsed ? (
          <div className="px-3 py-2 bg-navy-700 rounded-lg">
            <p className="text-[11px] text-navy-300">Admin Portal v1.0</p>
          </div>
        ) : (
          <div className="w-8 h-1 bg-navy-500 rounded mx-auto" />
        )}
      </div>
    </aside>
  );
}

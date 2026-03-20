"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, Bell, LogOut, Settings, User, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = session?.user?.name || "Admin";
  const userEmail = session?.user?.email || "admin@kana.com";
  const userImage = session?.user?.image;
  const userRole = (session?.user as Record<string, unknown>)?.role as string || "ADMIN";

  const notifications = [
    { id: 1, title: "New booking received", message: "Booking #1234 from John Doe", time: "5 min ago", unread: true },
    { id: 2, title: "Payment confirmed", message: "Payment of INR 25,000 received", time: "1 hour ago", unread: true },
    { id: 3, title: "Hotel review pending", message: "3 new reviews need approval", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search bookings, hotels, packages..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm
                         text-navy-800 dark:text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-navy-500/20 focus:border-navy-300 dark:focus:border-slate-500
                         placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Bell size={20} className="text-navy-600 dark:text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-navy-800 dark:text-slate-100">Notifications</h3>
                  <span className="text-xs text-navy-500 dark:text-slate-400 cursor-pointer hover:text-navy-700 dark:hover:text-slate-200">
                    Mark all read
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/40 cursor-pointer transition-colors ${
                        notif.unread ? "bg-sky-50/30 dark:bg-sky-900/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notif.unread && (
                          <div className="w-2 h-2 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" />
                        )}
                        <div className={notif.unread ? "" : "ml-4"}>
                          <p className="text-sm font-medium text-navy-800 dark:text-slate-100">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-slate-700 text-center">
                  <button className="text-xs text-navy-600 dark:text-slate-300 hover:text-navy-800 dark:hover:text-white font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-slate-600" />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              {userImage ? (
                <img src={userImage} alt={userName} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-navy-800 dark:text-slate-100 leading-tight">{userName}</p>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-tight">{userRole}</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 dark:text-slate-500 hidden md:block" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                  <p className="text-sm font-medium text-navy-800 dark:text-slate-100">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{userEmail}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => { setShowDropdown(false); router.push("/profile"); }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-navy-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push("/settings"); }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-navy-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="border-t border-gray-100 dark:border-slate-700 py-1">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, User, ChevronDown, Percent } from "lucide-react";

export default function AgentHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = session?.user?.name || "Agent";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-navy-800">Tour Agent Portal</h2>
          <p className="text-xs text-gray-500">KaNa Travels & Holidays</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {userImage ? (
                <img src={userImage} alt={userName} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-navy-800 leading-tight">{userName}</p>
                <p className="text-[10px] text-gray-500 leading-tight">Tour Agent</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 hidden md:block" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-navy-800">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => { setShowDropdown(false); router.push("/profile"); }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-navy-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={16} /> Profile
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push("/commission"); }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-navy-700 hover:bg-gray-50 transition-colors"
                  >
                    <Percent size={16} /> My Commission
                  </button>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} /> Sign out
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

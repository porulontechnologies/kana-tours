"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useAppearance } from "@/context/AppearanceContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { sidebarCollapsed } = useAppearance();

  const isAuthPage = pathname?.startsWith("/login");
  const isAuthenticated = status === "authenticated" && session?.user;

  if (isAuthPage || !isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-[72px]" : "ml-64"
        }`}
      >
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

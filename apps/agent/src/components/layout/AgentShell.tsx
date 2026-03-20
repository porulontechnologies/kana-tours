"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AgentSidebar from "./AgentSidebar";
import AgentHeader from "./AgentHeader";

export default function AgentShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/login");
  const isAuthenticated = status === "authenticated" && session?.user;

  if (isAuthPage || !isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AgentSidebar />
      <div className="flex-1 ml-64 transition-all duration-300">
        <AgentHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

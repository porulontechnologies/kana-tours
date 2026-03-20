import type { Metadata } from "next";
import { Providers } from "./providers";
import AdminShell from "@/components/layout/AdminShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "KaNa Admin | Travels & Holidays Management",
  description: "Admin dashboard for KaNa Travels and Holidays - manage hotels, packages, bookings, and users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-surface dark:bg-slate-900">
        <Providers>
          <AdminShell>{children}</AdminShell>
        </Providers>
      </body>
    </html>
  );
}

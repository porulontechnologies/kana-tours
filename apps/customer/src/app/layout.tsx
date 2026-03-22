import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { SiteConfigProvider } from "@/providers/SiteConfigProvider";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KaNa Travels and Holidays | Explore the World",
    template: "%s | KaNa Travels",
  },
  description:
    "Your trusted travel partner for tour packages, hotel bookings, flights, and bus services. Discover unforgettable experiences with KaNa Travels and Holidays.",
  keywords: [
    "travel",
    "tours",
    "holidays",
    "hotel booking",
    "flight booking",
    "bus booking",
    "tour packages",
    "KaNa Travels",
  ],
  openGraph: {
    title: "KaNa Travels and Holidays",
    description:
      "Explore the world with curated tour packages, best hotel deals, and seamless travel bookings.",
    siteName: "KaNa Travels and Holidays",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <QueryProvider>
            <SiteConfigProvider>
              <AppShell>{children}</AppShell>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    borderRadius: "12px",
                    background: "#1B3A5C",
                    color: "#fff",
                  },
                  success: {
                    iconTheme: { primary: "#E8A317", secondary: "#fff" },
                  },
                }}
              />
            </SiteConfigProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

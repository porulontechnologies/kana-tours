import type { Metadata } from "next";
import { Providers } from "./providers";
import AgentShell from "@/components/layout/AgentShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "KaNa Agent Portal | Travels & Holidays",
  description: "Tour Agent portal for KaNa Travels - book flights, buses, hotels and tour packages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-surface">
        <Providers>
          <AgentShell>{children}</AgentShell>
        </Providers>
      </body>
    </html>
  );
}

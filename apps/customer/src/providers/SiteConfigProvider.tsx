"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface SiteConfig {
  hero: {
    backgroundImage: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  testimonials: {
    backgroundImage: string;
    items: TestimonialItem[];
  };
  ctaBanner: {
    backgroundImage: string;
    heading: string;
    subtext: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  footer: {
    backgroundImage: string;
    companyName: string;
    tagline: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    backgroundImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&q=80",
    heading: "Explore the World",
    headingHighlight: "with Kala Travels",
    subheading: "Flights, Buses & Holiday Packages at Best Prices",
    primaryButtonText: "Book Now",
    primaryButtonLink: "/tours",
    secondaryButtonText: "Enquire Now",
    secondaryButtonLink: "/contact",
  },
  testimonials: {
    backgroundImage:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1600&h=700&fit=crop&q=80",
    items: [],
  },
  ctaBanner: {
    backgroundImage:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1600&h=500&fit=crop&q=80",
    heading: "Ready to Start Your Journey?",
    subtext:
      "Join thousands of happy travelers who have explored the world with KaNa. Your next adventure awaits.",
    primaryButtonText: "Browse Packages",
    secondaryButtonText: "Contact Us",
  },
  footer: {
    backgroundImage:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&h=600&fit=crop&q=80",
    companyName: "KaNa Travels",
    tagline: "& Holidays",
    description:
      "Your trusted travel partner for unforgettable experiences. We curate the best tour packages, hotels, flights, and bus services to make your journey seamless and memorable.",
    address: "123 Travel Avenue, Tourism District, Bangalore, Karnataka 560001",
    phone: "+91 12345 67890",
    email: "info@kanatravels.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
};

const SiteConfigContext = createContext<SiteConfig>(DEFAULT_SITE_CONFIG);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
    fetch(`${apiUrl}/site-config`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) setConfig(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export const useSiteConfig = () => useContext(SiteConfigContext);

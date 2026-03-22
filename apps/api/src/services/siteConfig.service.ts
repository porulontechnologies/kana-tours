import { prisma } from "@kana/database";

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface SiteConfigData {
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

export const DEFAULT_SITE_CONFIG: SiteConfigData = {
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

export async function getSiteConfig(): Promise<SiteConfigData> {
  const record = await prisma.siteConfig.findUnique({ where: { id: "default" } });
  if (!record) return DEFAULT_SITE_CONFIG;
  return record.config as SiteConfigData;
}

export async function updateSiteConfig(data: Partial<SiteConfigData>): Promise<SiteConfigData> {
  const current = await getSiteConfig();
  const merged: SiteConfigData = {
    hero: { ...current.hero, ...data.hero },
    testimonials: {
      ...current.testimonials,
      ...data.testimonials,
      items: data.testimonials?.items ?? current.testimonials.items,
    },
    ctaBanner: { ...current.ctaBanner, ...data.ctaBanner },
    footer: { ...current.footer, ...data.footer },
  };

  await prisma.siteConfig.upsert({
    where: { id: "default" },
    create: { id: "default", config: merged as object },
    update: { config: merged as object },
  });

  return merged;
}

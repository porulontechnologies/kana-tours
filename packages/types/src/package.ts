export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: string[];
  accommodation?: string;
}

export interface TourPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  destination: string;
  duration: number;
  nights: number;
  maxGroupSize: number;
  price: number;
  discountedPrice?: number | null;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
  coverImage?: string | null;
  startDates: Date[];
  category: TourCategory;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TourCategory =
  | "ADVENTURE"
  | "LEISURE"
  | "PILGRIMAGE"
  | "HONEYMOON"
  | "FAMILY"
  | "WILDLIFE"
  | "BEACH"
  | "MOUNTAIN";

export interface CreateTourPackageInput {
  name: string;
  description: string;
  shortDescription?: string;
  destination: string;
  duration: number;
  nights: number;
  maxGroupSize: number;
  price: number;
  discountedPrice?: number;
  inclusions?: string[];
  exclusions?: string[];
  itinerary: ItineraryDay[];
  images?: string[];
  coverImage?: string;
  startDates?: string[];
  category: TourCategory;
  isFeatured?: boolean;
}

export interface TourPackageFilters {
  destination?: string;
  category?: TourCategory;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  page?: number;
  limit?: number;
}

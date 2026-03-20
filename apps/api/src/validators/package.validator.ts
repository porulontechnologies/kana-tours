import { z } from "zod";

const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  activities: z.array(z.string()),
  meals: z.array(z.string()).optional(),
  accommodation: z.preprocess(v => v === "" ? undefined : v, z.string().optional()),
});

export const createPackageSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(10),
  shortDescription: z.preprocess(v => v === "" ? undefined : v, z.string().max(300).optional()),
  destination: z.string().min(1),
  duration: z.number().int().positive(),
  nights: z.number().int().min(0),
  maxGroupSize: z.number().int().positive(),
  price: z.number().positive(),
  discountedPrice: z.number().positive().optional(),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  itinerary: z.array(itineraryDaySchema).min(1),
  images: z.array(z.string()).default([]),
  coverImage: z.preprocess(v => v === "" ? undefined : v, z.string().optional()),
  startDates: z.array(z.string()).default([]),
  category: z.enum([
    "Adventure",
    "Nature",
    "Heritage",
    "Beach",
    "Pilgrimage",
    "Honeymoon",
    "Wildlife",
    "Luxury",
  ]),
  isFeatured: z.boolean().default(false),
});

export const updatePackageSchema = createPackageSchema.partial();

export const packageFilterSchema = z.object({
  destination: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minDuration: z.coerce.number().optional(),
  maxDuration: z.coerce.number().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  includeInactive: z.coerce.boolean().optional(),
});

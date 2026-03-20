import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().trim().min(5, "Description must be at least 5 characters"),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().default("India"),
  pincode: z.preprocess(v => v === "" ? undefined : v, z.string().optional()),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  starRating: z.number().min(1).max(5).default(3),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  pricePerNight: z.number().positive(),
  contactEmail: z.preprocess(v => v === "" ? undefined : v, z.string().email().optional()),
  contactPhone: z.preprocess(v => v === "" ? undefined : v, z.string().optional()),
});

export const updateHotelSchema = createHotelSchema.partial();

export const createRoomSchema = z.object({
  type: z.string().min(1),
  capacity: z.number().int().positive(),
  pricePerNight: z.number().positive(),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  totalRooms: z.number().int().positive(),
});

export const hotelFilterSchema = z.object({
  city: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  includeInactive: z.coerce.boolean().optional(),
});

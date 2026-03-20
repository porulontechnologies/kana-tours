import { z } from "zod";

export const createReviewSchema = z.object({
  targetType: z.enum(["HOTEL", "TOUR_PACKAGE"]),
  targetId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  comment: z.string().max(2000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().max(200).optional(),
  comment: z.string().max(2000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
});

export const reviewFilterSchema = z.object({
  targetType: z.enum(["HOTEL", "TOUR_PACKAGE"]).optional(),
  targetId: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

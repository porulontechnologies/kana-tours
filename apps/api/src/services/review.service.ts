import { Review } from "@kana/database";
import { NotFoundError, ConflictError, ForbiddenError } from "../utils/errors";
import { buildPaginationMeta } from "../utils/apiResponse";

interface CreateReviewInput {
  userId: string;
  userName?: string;
  userImage?: string;
  targetType: "HOTEL" | "TOUR_PACKAGE";
  targetId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
}

interface ReviewFilters {
  targetType?: string;
  targetId?: string;
  rating?: number;
  page?: number;
  limit?: number;
}

export async function createReview(input: CreateReviewInput) {
  const existing = await Review.findOne({
    userId: input.userId,
    targetType: input.targetType,
    targetId: input.targetId,
  });

  if (existing) {
    throw new ConflictError("You have already reviewed this item");
  }

  const review = await Review.create(input);
  return review;
}

export async function getReviews(filters: ReviewFilters) {
  const { targetType, targetId, rating, page = 1, limit = 10 } = filters;

  const query: Record<string, unknown> = {};
  if (targetType) query.targetType = targetType;
  if (targetId) query.targetId = targetId;
  if (rating) query.rating = rating;

  const [reviews, total] = await Promise.all([
    Review.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Review.countDocuments(query),
  ]);

  const meta = buildPaginationMeta(page, limit, total);
  return { reviews, meta };
}

export async function getReviewStats(targetType: string, targetId: string) {
  const stats = await Review.aggregate([
    { $match: { targetType, targetId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        ratingBreakdown: {
          $push: "$rating",
        },
      },
    },
  ]);

  if (!stats.length) {
    return { averageRating: 0, totalReviews: 0, breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
  }

  const breakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of stats[0].ratingBreakdown) {
    breakdown[r] = (breakdown[r] || 0) + 1;
  }

  return {
    averageRating: Math.round(stats[0].averageRating * 10) / 10,
    totalReviews: stats[0].totalReviews,
    breakdown,
  };
}

export async function updateReview(
  reviewId: string,
  userId: string,
  data: Partial<{ rating: number; title: string; comment: string; images: string[] }>
) {
  const review = await Review.findById(reviewId);
  if (!review) throw new NotFoundError("Review");
  if (review.userId !== userId) throw new ForbiddenError("You can only edit your own reviews");

  Object.assign(review, data);
  await review.save();
  return review;
}

export async function deleteReview(reviewId: string, userId: string, isAdmin = false) {
  const review = await Review.findById(reviewId);
  if (!review) throw new NotFoundError("Review");
  if (!isAdmin && review.userId !== userId) {
    throw new ForbiddenError("You can only delete your own reviews");
  }

  await Review.findByIdAndDelete(reviewId);
}

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Star, User, ThumbsUp, MessageSquare } from "lucide-react";

interface ReviewSectionProps {
  targetType: "HOTEL" | "TOUR_PACKAGE";
  targetId: string;
}

function StarRating({
  rating,
  onRate,
  size = "sm",
}: {
  rating: number;
  onRate?: (r: number) => void;
  size?: "sm" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-7 w-7" : "h-4 w-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating
              ? "fill-gold text-gold"
              : "fill-none text-gray-300"
          } ${onRate ? "cursor-pointer hover:text-gold" : ""}`}
          onClick={() => onRate?.(star)}
        />
      ))}
    </div>
  );
}

function RatingBreakdown({
  breakdown,
  total,
}: {
  breakdown: Record<number, number>;
  total: number;
}) {
  return (
    <div className="space-y-1.5">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = breakdown[star] || 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={star} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-gray-600">{star}</span>
            <Star className="h-3 w-3 fill-gold text-gold" />
            <div className="h-2 flex-1 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-gold"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-6 text-right text-gray-500">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ReviewSection({
  targetType,
  targetId,
}: ReviewSectionProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const { data: statsData } = useQuery({
    queryKey: ["review-stats", targetType, targetId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/reviews/stats/${targetType}/${targetId}`
      );
      return data.data;
    },
  });

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["reviews", targetType, targetId],
    queryFn: async () => {
      const { data } = await apiClient.get("/reviews", {
        params: { targetType, targetId, limit: 20 },
      });
      return data;
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post("/reviews", {
        targetType,
        targetId,
        rating,
        title: title || undefined,
        comment: comment || undefined,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", targetType, targetId] });
      queryClient.invalidateQueries({
        queryKey: ["review-stats", targetType, targetId],
      });
      setShowForm(false);
      setRating(0);
      setTitle("");
      setComment("");
    },
  });

  const stats = statsData || {
    averageRating: 0,
    totalReviews: 0,
    breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
  const reviews = reviewsData?.data || [];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-navy">Reviews & Ratings</h2>

      {/* Stats Summary */}
      <div className="mt-6 flex flex-col gap-6 rounded-xl bg-white p-6 shadow-md sm:flex-row">
        <div className="text-center sm:pr-8 sm:border-r">
          <p className="text-5xl font-bold text-navy">
            {stats.averageRating || "-"}
          </p>
          <StarRating rating={Math.round(stats.averageRating)} />
          <p className="mt-1 text-sm text-gray-500">
            {stats.totalReviews} review{stats.totalReviews !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex-1">
          <RatingBreakdown
            breakdown={stats.breakdown}
            total={stats.totalReviews}
          />
        </div>
        <div className="sm:pl-8 sm:border-l">
          {session ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-gold flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Write a Review
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              <a href="/login" className="text-sky hover:underline">
                Sign in
              </a>{" "}
              to write a review
            </p>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <h3 className="text-lg font-bold text-navy">Write Your Review</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Your Rating
              </label>
              <StarRating rating={rating} onRate={setRating} size="lg" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Summarize your experience"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Your Review (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-field min-h-[100px] resize-y"
                placeholder="Tell others about your experience..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => submitMutation.mutate()}
                disabled={rating === 0 || submitMutation.isPending}
                className="btn-gold disabled:opacity-50"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Review"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
            {submitMutation.isError && (
              <p className="text-sm text-red-600">
                {(submitMutation.error as any)?.response?.data?.message ||
                  "Failed to submit review. You may have already reviewed this."}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="mt-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-3 border-navy border-t-transparent" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-md">
            <MessageSquare className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-3 text-gray-500">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          reviews.map((review: any) => (
            <div
              key={review._id}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10">
                    {review.userImage ? (
                      <img
                        src={review.userImage}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-navy" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.userName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              {review.title && (
                <h4 className="mt-3 font-semibold text-gray-900">
                  {review.title}
                </h4>
              )}
              {review.comment && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              )}
              {review.images && review.images.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {review.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

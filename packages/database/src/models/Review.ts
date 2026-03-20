import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userId: string;
  userName?: string;
  userImage?: string;
  targetType: "HOTEL" | "TOUR_PACKAGE";
  targetId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: { type: String, required: true, index: true },
    userName: String,
    userImage: String,
    targetType: {
      type: String,
      enum: ["HOTEL", "TOUR_PACKAGE"],
      required: true,
    },
    targetId: { type: String, required: true, index: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: String,
    comment: String,
    images: [String],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.index({ targetType: 1, targetId: 1 });

export const Review =
  mongoose.models.Review ||
  mongoose.model<IReview>("Review", reviewSchema);

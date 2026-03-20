import mongoose, { Schema, Document } from "mongoose";

export interface IAnalytics extends Document {
  event: string;
  date: Date;
  data: Record<string, unknown>;
  aggregations?: {
    totalBookings?: number;
    totalRevenue?: number;
    topDestinations?: Array<{ name: string; count: number }>;
    conversionRate?: number;
  };
}

const analyticsSchema = new Schema<IAnalytics>({
  event: { type: String, required: true, index: true },
  date: { type: Date, default: Date.now, index: true },
  data: Schema.Types.Mixed,
  aggregations: {
    totalBookings: Number,
    totalRevenue: Number,
    topDestinations: [{ name: String, count: Number }],
    conversionRate: Number,
  },
});

export const Analytics =
  mongoose.models.Analytics ||
  mongoose.model<IAnalytics>("Analytics", analyticsSchema);

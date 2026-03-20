import mongoose, { Schema, Document } from "mongoose";

export interface ISearchCache extends Document {
  cacheKey: string;
  searchType: "FLIGHT" | "BUS" | "HOTEL";
  params: Record<string, unknown>;
  results: unknown;
  expiresAt: Date;
  createdAt: Date;
}

const searchCacheSchema = new Schema<ISearchCache>({
  cacheKey: { type: String, unique: true, required: true },
  searchType: {
    type: String,
    enum: ["FLIGHT", "BUS", "HOTEL"],
    required: true,
  },
  params: Schema.Types.Mixed,
  results: Schema.Types.Mixed,
  expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
  createdAt: { type: Date, default: Date.now },
});

export const SearchCache =
  mongoose.models.SearchCache ||
  mongoose.model<ISearchCache>("SearchCache", searchCacheSchema);

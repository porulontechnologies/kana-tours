import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/review.service";
import { sendSuccess } from "../utils/apiResponse";

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await reviewService.createReview({
      ...req.body,
      userId: req.user!.id,
      userName: req.user!.name || undefined,
    });
    sendSuccess(res, review, "Review submitted successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function getReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const { reviews, meta } = await reviewService.getReviews(req.query as any);
    sendSuccess(res, reviews, undefined, 200, meta);
  } catch (error) {
    next(error);
  }
}

export async function getReviewStats(req: Request, res: Response, next: NextFunction) {
  try {
    const { targetType, targetId } = req.params;
    const stats = await reviewService.getReviewStats(targetType, targetId);
    sendSuccess(res, stats);
  } catch (error) {
    next(error);
  }
}

export async function updateReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await reviewService.updateReview(req.params.id, req.user!.id, req.body);
    sendSuccess(res, review, "Review updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user!.role === "ADMIN" || req.user!.role === "SUPER_ADMIN";
    await reviewService.deleteReview(req.params.id, req.user!.id, isAdmin);
    sendSuccess(res, null, "Review deleted successfully");
  } catch (error) {
    next(error);
  }
}

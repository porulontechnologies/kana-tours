import { Router } from "express";
import * as reviewCtrl from "../controllers/review.controller";
import { authenticate, optionalAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createReviewSchema,
  updateReviewSchema,
  reviewFilterSchema,
} from "../validators/review.validator";

const router = Router();

router.get("/", validate(reviewFilterSchema, "query"), reviewCtrl.getReviews);
router.get("/stats/:targetType/:targetId", reviewCtrl.getReviewStats);
router.post(
  "/",
  authenticate,
  validate(createReviewSchema),
  reviewCtrl.createReview
);
router.patch(
  "/:id",
  authenticate,
  validate(updateReviewSchema),
  reviewCtrl.updateReview
);
router.delete("/:id", authenticate, reviewCtrl.deleteReview);

export default router;

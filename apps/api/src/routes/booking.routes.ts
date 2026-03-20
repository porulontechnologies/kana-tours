import { Router } from "express";
import * as bookingCtrl from "../controllers/booking.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "../validators/booking.validator";

const router = Router();

router.post("/", authenticate, validate(createBookingSchema), bookingCtrl.createBooking);
router.get("/", authenticate, authorize("ADMIN", "SUPER_ADMIN", "AGENT"), bookingCtrl.getBookings);
router.get("/my", authenticate, bookingCtrl.getMyBookings);
router.get("/:id", authenticate, bookingCtrl.getBooking);
router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(updateBookingStatusSchema),
  bookingCtrl.updateBookingStatus
);
router.post("/:id/cancel", authenticate, bookingCtrl.cancelBooking);

export default router;

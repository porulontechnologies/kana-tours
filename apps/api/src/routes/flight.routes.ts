import { Router } from "express";
import * as flightCtrl from "../controllers/flight.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { prisma } from "@kana/database";
import { sendSuccess } from "../utils/apiResponse";
import { buildPaginationMeta } from "../utils/apiResponse";
import type { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/airports", flightCtrl.searchAirports);
router.post("/search", flightCtrl.searchFlights);
router.get("/offers/:offerId", authenticate, flightCtrl.getFlightOffer);
router.post("/book", authenticate, flightCtrl.bookFlight);

// Admin: list flight bookings
router.get(
  "/bookings",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where: { bookingType: "FLIGHT" },
          include: {
            user: { select: { id: true, name: true, email: true } },
            payment: true,
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.booking.count({ where: { bookingType: "FLIGHT" } }),
      ]);

      sendSuccess(res, bookings, undefined, 200, buildPaginationMeta(page, limit, total));
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import hotelRoutes from "./hotel.routes";
import packageRoutes from "./package.routes";
import bookingRoutes from "./booking.routes";
import paymentRoutes from "./payment.routes";
import flightRoutes from "./flight.routes";
import busRoutes from "./bus.routes";
import reviewRoutes from "./review.routes";
import agentRoutes from "./agent.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/hotels", hotelRoutes);
router.use("/packages", packageRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/flights", flightRoutes);
router.use("/buses", busRoutes);
router.use("/reviews", reviewRoutes);
router.use("/agents", agentRoutes);

export default router;

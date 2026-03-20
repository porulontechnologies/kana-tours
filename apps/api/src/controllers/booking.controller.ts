import { Request, Response, NextFunction } from "express";
import * as bookingService from "../services/booking.service";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { prisma } from "@kana/database";

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) return sendError(res, "Authentication required", 401);
    const booking = await bookingService.createBooking({
      ...req.body,
      userId: req.user.id,
    });
    sendSuccess(res, booking, "Booking created successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function getBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const params: any = { ...req.query };
    // Agents only see their own bookings — filter by agentId
    if (req.user?.role === "AGENT") {
      const agentProfile = await prisma.tourAgent.findUnique({ where: { userId: req.user.id } });
      if (agentProfile) {
        params.agentId = agentProfile.id;
      } else {
        // Agent profile not set up yet — return empty
        return sendSuccess(res, [], undefined, 200, { page: 1, limit: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false });
      }
    }
    const { bookings, meta } = await bookingService.getBookings(params);
    sendSuccess(res, bookings, undefined, 200, meta);
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) return sendError(res, "Authentication required", 401);
    const { bookings, meta } = await bookingService.getBookings({
      ...req.query as any,
      userId: req.user.id,
    });
    sendSuccess(res, bookings, undefined, 200, meta);
  } catch (error) {
    next(error);
  }
}

export async function getBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    // Non-admin can only see own bookings
    if (req.user?.role === "CUSTOMER" && booking.userId !== req.user.id) {
      return sendError(res, "Not found", 404);
    }
    sendSuccess(res, booking);
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingService.updateBookingStatus(
      req.params.id,
      req.body.status
    );
    sendSuccess(res, booking, "Booking status updated");
  } catch (error) {
    next(error);
  }
}

export async function cancelBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.role === "CUSTOMER" ? req.user.id : undefined;
    const booking = await bookingService.cancelBooking(req.params.id, userId);
    sendSuccess(res, booking, "Booking cancelled successfully");
  } catch (error) {
    next(error);
  }
}

import { z } from "zod";

const passengerDetailSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
  gender: z.enum(["M", "F", "O"]),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
});

export const createBookingSchema = z.object({
  bookingType: z.enum(["TOUR_PACKAGE", "HOTEL", "FLIGHT", "BUS"]),
  hotelId: z.string().optional(),
  roomId: z.string().optional(),
  tourPackageId: z.string().optional(),
  externalRef: z.string().optional(),
  totalAmount: z.number().positive().optional(),
  currency: z.string().default("INR"),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guestCount: z.number().int().positive().default(1),
  specialRequests: z.string().optional(),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(10),
  passengerDetails: z.union([z.array(passengerDetailSchema), z.record(z.unknown())]).optional(),
  paymentGateway: z.enum(["RAZORPAY", "PAYU"]).optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "REFUNDED"]),
});

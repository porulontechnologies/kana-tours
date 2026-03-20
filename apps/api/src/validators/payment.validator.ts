import { z } from "zod";

export const createOrderSchema = z.object({
  bookingId: z.string().min(1),
  gateway: z.enum(["RAZORPAY", "PAYU"]),
  method: z.enum(["UPI", "CARD", "NETBANKING", "WALLET"]).optional(),
});

export const verifyPaymentSchema = z.object({
  gateway: z.enum(["RAZORPAY", "PAYU"]),
  orderId: z.string().min(1),
  paymentId: z.string().optional(),
  signature: z.string().optional(),
  mihpayid: z.string().optional(),
  status: z.string().optional(),
  hash: z.string().optional(),
});

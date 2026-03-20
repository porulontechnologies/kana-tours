import { Request, Response, NextFunction } from "express";
import { prisma } from "@kana/database";
import { getPaymentProvider } from "../services/payment/payment.service";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { NotFoundError } from "../utils/errors";
import { logger } from "../utils/logger";

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { bookingId, gateway, method } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) throw new NotFoundError("Booking");
    if (booking.userId !== req.user?.id) {
      return sendError(res, "Unauthorized", 403);
    }

    const provider = getPaymentProvider(gateway);
    const order = await provider.createOrder(
      booking.totalAmount,
      booking.currency,
      booking.id,
      booking.contactEmail,
      booking.contactName,
      booking.contactPhone
    );

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        gateway,
        method: method || null,
        gatewayOrderId: order.gatewayOrderId,
        amount: booking.totalAmount,
        currency: booking.currency,
        status: "PENDING",
      },
    });

    sendSuccess(res, order, "Payment order created");
  } catch (error) {
    next(error);
  }
}

export async function verifyPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { gateway, ...payload } = req.body;

    const provider = getPaymentProvider(gateway);
    const result = await provider.verifyPayment(payload);

    if (!result.verified) {
      return sendError(res, "Payment verification failed", 400);
    }

    // Update payment and booking status
    const payment = await prisma.payment.update({
      where: { gatewayOrderId: result.orderId },
      data: {
        status: "SUCCESS",
        gatewayPaymentId: result.paymentId,
        gatewayResponse: payload as any,
        paidAt: new Date(),
      },
    });

    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: "CONFIRMED" },
    });

    sendSuccess(res, { bookingId: payment.bookingId }, "Payment verified successfully");
  } catch (error) {
    next(error);
  }
}

export async function razorpayWebhook(req: Request, res: Response) {
  try {
    const event = req.body;
    logger.info({ event: event.event }, "Razorpay webhook received");

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity;
      if (paymentEntity) {
        await prisma.payment.updateMany({
          where: { gatewayOrderId: paymentEntity.order_id },
          data: {
            status: "SUCCESS",
            gatewayPaymentId: paymentEntity.id,
            paidAt: new Date(),
          },
        });
      }
    }

    res.status(200).json({ status: "ok" });
  } catch {
    res.status(200).json({ status: "ok" });
  }
}

export async function payuWebhook(req: Request, res: Response) {
  try {
    logger.info("PayU webhook received");
    const { txnid, status, mihpayid } = req.body;

    if (status === "success" && txnid) {
      await prisma.payment.updateMany({
        where: { gatewayOrderId: txnid },
        data: {
          status: "SUCCESS",
          gatewayPaymentId: mihpayid,
          paidAt: new Date(),
        },
      });
    }

    res.status(200).json({ status: "ok" });
  } catch {
    res.status(200).json({ status: "ok" });
  }
}

export async function getPaymentStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { bookingId: req.params.bookingId },
    });
    if (!payment) throw new NotFoundError("Payment");
    sendSuccess(res, payment);
  } catch (error) {
    next(error);
  }
}

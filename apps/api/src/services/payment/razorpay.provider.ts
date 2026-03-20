import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "../../config/env";
import type {
  PaymentProvider,
  CreateOrderResult,
  VerifyResult,
  RefundResult,
} from "./payment.service";

export class RazorpayProvider implements PaymentProvider {
  private razorpay: InstanceType<typeof Razorpay> | null = null;

  private getClient() {
    if (!this.razorpay) {
      if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay credentials not configured");
      }
      this.razorpay = new Razorpay({
        key_id: env.RAZORPAY_KEY_ID,
        key_secret: env.RAZORPAY_KEY_SECRET,
      });
    }
    return this.razorpay;
  }

  async createOrder(
    amount: number,
    currency: string,
    bookingId: string
  ): Promise<CreateOrderResult> {
    const client = this.getClient();

    const order = await client.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency,
      receipt: bookingId,
      notes: { bookingId },
    });

    return {
      orderId: bookingId,
      amount,
      currency,
      gateway: "RAZORPAY",
      gatewayOrderId: order.id,
      keyId: env.RAZORPAY_KEY_ID,
    };
  }

  async verifyPayment(payload: Record<string, unknown>): Promise<VerifyResult> {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = payload as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    };

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    return {
      verified: expectedSignature === razorpay_signature,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    };
  }

  async processRefund(paymentId: string, amount: number): Promise<RefundResult> {
    const client = this.getClient();

    const refund = await client.payments.refund(paymentId, {
      amount: Math.round(amount * 100),
    });

    return {
      refundId: refund.id,
      amount: amount,
      status: refund.status || "processed",
    };
  }
}

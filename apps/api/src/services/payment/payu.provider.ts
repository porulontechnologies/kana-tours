import crypto from "crypto";
import { env } from "../../config/env";
import type {
  PaymentProvider,
  CreateOrderResult,
  VerifyResult,
  RefundResult,
} from "./payment.service";

export class PayUProvider implements PaymentProvider {
  private generateHash(params: string): string {
    return crypto
      .createHash("sha512")
      .update(params)
      .digest("hex");
  }

  async createOrder(
    amount: number,
    currency: string,
    bookingId: string,
    customerEmail: string,
    customerName: string,
    customerPhone: string
  ): Promise<CreateOrderResult> {
    if (!env.PAYU_MERCHANT_KEY || !env.PAYU_MERCHANT_SALT) {
      throw new Error("PayU credentials not configured");
    }

    const txnId = `KANA_${bookingId}_${Date.now()}`;

    // PayU hash: key|txnid|amount|productinfo|firstname|email|||||||||||salt
    const hashString = `${env.PAYU_MERCHANT_KEY}|${txnId}|${amount}|KaNa Booking|${customerName}|${customerEmail}|||||||||||${env.PAYU_MERCHANT_SALT}`;
    const hash = this.generateHash(hashString);

    return {
      orderId: bookingId,
      amount,
      currency,
      gateway: "PAYU",
      gatewayOrderId: txnId,
      merchantKey: env.PAYU_MERCHANT_KEY,
      hash,
      txnId,
    };
  }

  async verifyPayment(payload: Record<string, unknown>): Promise<VerifyResult> {
    if (!env.PAYU_MERCHANT_SALT) {
      throw new Error("PayU credentials not configured");
    }

    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      mihpayid,
      hash: receivedHash,
    } = payload as Record<string, string>;

    // Reverse hash: salt|status|||||||||||email|firstname|productinfo|amount|txnid|key
    const reverseHashString = `${env.PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${env.PAYU_MERCHANT_KEY}`;
    const expectedHash = this.generateHash(reverseHashString);

    return {
      verified: expectedHash === receivedHash && status === "success",
      paymentId: mihpayid,
      orderId: txnid,
    };
  }

  async processRefund(paymentId: string, amount: number): Promise<RefundResult> {
    // PayU refund requires API call to PayU's refund endpoint
    // Using placeholder - actual implementation needs PayU's merchant dashboard API
    return {
      refundId: `REFUND_${paymentId}`,
      amount,
      status: "initiated",
    };
  }
}

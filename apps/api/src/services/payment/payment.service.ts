import type { PaymentGateway } from "@kana/types";
import { RazorpayProvider } from "./razorpay.provider";
import { PayUProvider } from "./payu.provider";

export interface CreateOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  gateway: PaymentGateway;
  gatewayOrderId: string;
  keyId?: string;
  merchantKey?: string;
  hash?: string;
  txnId?: string;
}

export interface VerifyResult {
  verified: boolean;
  paymentId: string;
  orderId: string;
}

export interface RefundResult {
  refundId: string;
  amount: number;
  status: string;
}

export interface PaymentProvider {
  createOrder(
    amount: number,
    currency: string,
    bookingId: string,
    customerEmail: string,
    customerName: string,
    customerPhone: string
  ): Promise<CreateOrderResult>;
  verifyPayment(payload: Record<string, unknown>): Promise<VerifyResult>;
  processRefund(paymentId: string, amount: number): Promise<RefundResult>;
}

export function getPaymentProvider(gateway: PaymentGateway): PaymentProvider {
  switch (gateway) {
    case "RAZORPAY":
      return new RazorpayProvider();
    case "PAYU":
      return new PayUProvider();
    default:
      throw new Error(`Unsupported payment gateway: ${gateway}`);
  }
}

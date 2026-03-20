export type PaymentGateway = "RAZORPAY" | "PAYU";
export type PaymentMethod = "UPI" | "CARD" | "NETBANKING" | "WALLET";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export interface Payment {
  id: string;
  bookingId: string;
  gateway: PaymentGateway;
  method?: PaymentMethod | null;
  gatewayOrderId?: string | null;
  gatewayPaymentId?: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paidAt?: Date | null;
  refundedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface VerifyPaymentInput {
  gateway: PaymentGateway;
  orderId: string;
  paymentId?: string;
  signature?: string;
  // PayU specific
  mihpayid?: string;
  status?: string;
  hash?: string;
}

import { Router } from "express";
import * as paymentCtrl from "../controllers/payment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createOrderSchema, verifyPaymentSchema } from "../validators/payment.validator";

const router = Router();

router.post(
  "/create-order",
  authenticate,
  validate(createOrderSchema),
  paymentCtrl.createOrder
);
router.post("/verify", validate(verifyPaymentSchema), paymentCtrl.verifyPayment);
router.post("/webhook/razorpay", paymentCtrl.razorpayWebhook);
router.post("/webhook/payu", paymentCtrl.payuWebhook);
router.get("/:bookingId", authenticate, paymentCtrl.getPaymentStatus);

export default router;

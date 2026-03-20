import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { googleAuthSchema, registerSchema, loginSchema } from "../validators/auth.validator";
import { authLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), authCtrl.register);
router.post("/login", authLimiter, validate(loginSchema), authCtrl.login);
router.post("/google", authLimiter, validate(googleAuthSchema), authCtrl.googleAuth);
router.post("/social-login", authCtrl.socialLogin);
router.get("/me", authenticate, authCtrl.getMe);
router.post("/logout", authenticate, authCtrl.logout);

export default router;

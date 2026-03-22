import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import * as siteConfigController from "../controllers/siteConfig.controller";

const router = Router();

// Public — customer app fetches this
router.get("/", siteConfigController.getSiteConfig);

// Admin only
router.put("/", authenticate, authorize("ADMIN", "SUPER_ADMIN"), siteConfigController.updateSiteConfig);

export default router;

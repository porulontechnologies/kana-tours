import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import * as agentCtrl from "../controllers/agent.controller";

const router = Router();

// Admin-only routes
router.get("/", authenticate, authorize("ADMIN", "SUPER_ADMIN"), agentCtrl.getAgents);
router.post("/", authenticate, authorize("ADMIN", "SUPER_ADMIN"), agentCtrl.createAgent);
router.get("/:id", authenticate, authorize("ADMIN", "SUPER_ADMIN"), agentCtrl.getAgent);
router.patch("/:id/commissions", authenticate, authorize("ADMIN", "SUPER_ADMIN"), agentCtrl.updateCommissions);
router.patch("/:id/toggle-status", authenticate, authorize("ADMIN", "SUPER_ADMIN"), agentCtrl.toggleAgentStatus);
router.get("/:id/stats", authenticate, authorize("ADMIN", "SUPER_ADMIN"), agentCtrl.getAgentStats);

// Agent self-service routes
router.get("/me/profile", authenticate, authorize("AGENT"), agentCtrl.getMyAgentProfile);
router.get("/me/stats", authenticate, authorize("AGENT"), agentCtrl.getMyStats);

export default router;

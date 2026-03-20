import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { updateProfileSchema } from "../validators/auth.validator";

const router = Router();

router.get("/", authenticate, authorize("ADMIN", "SUPER_ADMIN"), userCtrl.getUsers);
router.post("/", authenticate, authorize("ADMIN", "SUPER_ADMIN"), userCtrl.createUser);

// "me" routes must be declared before /:id
router.patch("/me", authenticate, userCtrl.updateMe);
router.patch("/me/password", authenticate, userCtrl.changeMyPassword);

router.get("/:id", authenticate, userCtrl.getUser);
router.patch("/:id", authenticate, validate(updateProfileSchema), userCtrl.updateUser);
router.patch("/:id/role", authenticate, authorize("ADMIN", "SUPER_ADMIN"), userCtrl.updateUserRole);

export default router;

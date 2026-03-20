import { Router } from "express";
import * as packageCtrl from "../controllers/package.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createPackageSchema,
  updatePackageSchema,
  packageFilterSchema,
} from "../validators/package.validator";

const router = Router();

router.get("/", validate(packageFilterSchema, "query"), packageCtrl.getPackages);
router.get("/featured", packageCtrl.getFeaturedPackages);
router.get("/id/:id", packageCtrl.getPackageById);
router.get("/:slug", packageCtrl.getPackage);
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(createPackageSchema),
  packageCtrl.createPackage
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(updatePackageSchema),
  packageCtrl.updatePackage
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  packageCtrl.deletePackage
);

export default router;

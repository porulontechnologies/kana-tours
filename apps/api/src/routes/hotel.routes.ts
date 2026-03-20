import { Router } from "express";
import * as hotelCtrl from "../controllers/hotel.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createHotelSchema,
  updateHotelSchema,
  createRoomSchema,
  hotelFilterSchema,
} from "../validators/hotel.validator";

const router = Router();

router.get("/", validate(hotelFilterSchema, "query"), hotelCtrl.getHotels);
router.get("/id/:id", hotelCtrl.getHotelById);
router.get("/:slug", hotelCtrl.getHotel);
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(createHotelSchema),
  hotelCtrl.createHotel
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(updateHotelSchema),
  hotelCtrl.updateHotel
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  hotelCtrl.deleteHotel
);
router.get("/:id/rooms", hotelCtrl.getHotelRooms);
router.post(
  "/:id/rooms",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(createRoomSchema),
  hotelCtrl.addRoom
);

export default router;

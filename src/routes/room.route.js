import { Router } from "express";
import {
  createRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { verifyJWT, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Room CRUD
router.route("/admin/add-room").post(verifyJWT, checkRole("Admin"), createRoom);
router
  .route("/admin/get-room/:roomId")
  .get(verifyJWT, checkRole("Admin"), getRoom);
router
  .route("/admin/get-all-room")
  .get(verifyJWT, checkRole("Admin"), getAllRooms);
router
  .route("/admin/update-room/:roomId")
  .patch(verifyJWT, checkRole("Admin"), updateRoom);
router
  .route("/admin/delete-room/:roomId")
  .delete(verifyJWT, checkRole("Admin"), deleteRoom);

export default router;

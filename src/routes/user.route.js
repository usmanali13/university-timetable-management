import { Router } from "express";
import {
  registerUser,
  registerAdmin,
  loginUser,
  logoutUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} from "../controllers/user.controller.js";

import { verifyJWT, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Auth Routes
router.route("/register").post(registerUser);
router.route("/registerAdmin").post(registerAdmin);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshToken);

router
  .route("/profile")
  .get(verifyJWT, checkRole("Admin", "Student"), getUserProfile);
router.route("/update-profile").patch(verifyJWT, updateUserProfile);
router.route("/update-password").patch(verifyJWT, updateUserPassword);
router
  .route("/delete-accountAdmin")
  .delete(verifyJWT, checkRole("Admin"), deleteUserAccount);
router
  .route("/delete-accountStudent")
  .delete(verifyJWT, checkRole("Student"), deleteUserAccount);

// ✅ Notifications (Real-time via sockets or events — to be handled separately)

export default router;

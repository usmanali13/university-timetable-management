import { Router } from "express";
import {
  registerUser,
  registerAdmin,
  adminLogin,        // New route for Admin login
  studentLogin,      // New route for Student login
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

// Separate login routes for Admin and Student
router.route("/login/admin").post(adminLogin); // Admin login
router.route("/login/student").post(studentLogin); // Student login

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

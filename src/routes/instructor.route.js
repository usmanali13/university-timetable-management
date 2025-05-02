import { Router } from "express";
import {
  createInstructor,
  getInstructor,
  getAllInstructors,
  updateInstructor,
  deleteInstructor,
} from "../controllers/instructor.controller.js";
import { verifyJWT, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Instructor CRUD
router
  .route("/admin/add-instructor")
  .post(verifyJWT, checkRole("Admin"), createInstructor);
router
  .route("/admin/get-instructor/:instructorId")
  .get(verifyJWT, checkRole("Admin"), getInstructor);
router
  .route("/admin/get-all-instructor")
  .get(verifyJWT, checkRole("Admin"), getAllInstructors);
router
  .route("/admin/update-instructor/:instructorId")
  .patch(verifyJWT, checkRole("Admin"), updateInstructor);
router
  .route("/admin/delete-instructor/:instructorId")
  .delete(verifyJWT, checkRole("Admin"), deleteInstructor);

export default router;

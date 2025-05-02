import { Router } from "express";
import {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { verifyJWT, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Courses CRUD
router
  .route("/admin/add-course")
  .post(verifyJWT, checkRole("Admin"), createCourse);
router
  .route("/admin/get-course/:courseId")
  .get(verifyJWT, checkRole("Admin"), getCourse);
router
  .route("/admin/get-all-course")
  .get(verifyJWT, checkRole("Admin"), getAllCourses);
router
  .route("/admin/update-course/:courseId")
  .patch(verifyJWT, checkRole("Admin"), updateCourse);
router
  .route("/admin/delete-course/:courseId")
  .delete(verifyJWT, checkRole("Admin"), deleteCourse);

export default router;

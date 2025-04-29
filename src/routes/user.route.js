import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  adminDashboard,
  studentDashboard,
} from "../controllers/user.controller.js";
import {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import {
  createInstructor,
  getInstructor,
  getAllInstructors,
  updateInstructor,
  deleteInstructor,
} from "../controllers/instructor.controller.js";
import {
  createRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import {
  generateTimetable,
  getTimetable,
  editTimetableEntry,
  downloadTimetablePDF,
  sendTimetableEmail,
  getStudentTimetable,
} from "../controllers/timetable.controller.js";

import { verifyJWT, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Auth Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/refresh-token").post(refreshToken);

router
  .route("/profile")
  .get(verifyJWT, checkRole("Admin", "Student"), getUserProfile);
router.route("/update-profile").patch(verifyJWT, updateUserProfile);

// ✅ Admin Routes
router.route("/admin-dashboard").get(checkRole("Admin"), adminDashboard);

// ✅ Courses CRUD
router
  .route("/admin/add-course")
  .post(verifyJWT, checkRole("Admin"), createCourse);
router.route("/admin/get-course").get(verifyJWT, checkRole("Admin"), getCourse);
router
  .route("/admin/get-all-course")
  .get(verifyJWT, checkRole("Admin"), getAllCourses);
router
  .route("/admin/update-course/:courseId")
  .patch(verifyJWT, checkRole("Admin"), updateCourse);
router
  .route("/admin/delete-course/:courseId")
  .delete(verifyJWT, checkRole("Admin"), deleteCourse);

// ✅ Instructor CRUD
router
  .route("/admin/add-instructor")
  .post(verifyJWT, checkRole("Admin"), createInstructor);
router
  .route("/admin/get-instructor")
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

// ✅ Room CRUD
router.route("/admin/add-room").post(verifyJWT, checkRole("Admin"), createRoom);
router.route("/admin/get-room").get(verifyJWT, checkRole("Admin"), getRoom);
router
  .route("/admin/get-all-room")
  .get(verifyJWT, checkRole("Admin"), getAllRooms);
router
  .route("/admin/update-room/:roomId")
  .patch(verifyJWT, checkRole("Admin"), updateRoom);
router
  .route("/admin/delete-room/:roomId")
  .delete(verifyJWT, checkRole("Admin"), deleteRoom);

// ✅ Timetable Routes
router
  .route("/admin/generate-timetable")
  .post(verifyJWT, checkRole("Admin"), generateTimetable);
router
  .route("/admin/edit-timetable")
  .patch(verifyJWT, checkRole("Admin"), editTimetableEntry);
router
  .route("/admin/download-timetable")
  .get(verifyJWT, checkRole("Admin"), downloadTimetablePDF);
router
  .route("/admin/send-timetable")
  .post(verifyJWT, checkRole("Admin"), sendTimetableEmail);

// ✅ Student Routes
router
  .route("/student-dashboard")
  .get(verifyJWT, checkRole("Student"), studentDashboard);
router
  .route("/student/view-timetable")
  .get(verifyJWT, checkRole("Student"), getStudentTimetable);
router
  .route("/student/download-timetable")
  .get(verifyJWT, checkRole("Student"), downloadTimetablePDF);

// ✅ Notifications (Real-time via sockets or events — to be handled separately)

export default router;

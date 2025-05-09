import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

// import Routes
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js";
import instructorRoutes from "./routes/instructor.route.js";
import roomRoutes from "./routes/room.route.js";
import timetableRoutes from "./routes/timetable.route.js";

import { ApiError } from "./utils/ApiError.js";
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/instructors", instructorRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/timetables", timetableRoutes);

app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

app.use(errorHandler);

export default app;

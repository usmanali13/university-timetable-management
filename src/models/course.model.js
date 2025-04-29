import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    creditHours: {
      type: Number,
      required: true,
    },
    classType: {
      type: String,
      enum: ["Lecture", "Lab"],
      default: "Lecture",
    },
    semester: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

export const Course = mongoose.model("Course", courseSchema);

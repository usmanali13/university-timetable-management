import mongoose, { Schema } from "mongoose";

const timetableSchema = new Schema(
  {
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["Morning", "Evening"],
      required: true,
    },
    schedule: [
      {
        day: {
          type: String, // Monday, Tuesday, etc.
          required: true,
        },
        classes: [
          {
            timeSlot: {
              type: String, // e.g., 9AM-10AM
              required: true,
            },
            courseName: {
              type: String,
              required: true,
            },
            courseCode: {
              type: String,
              required: true,
            },
            creditHours: {
              type: Number,
              required: true,
            },
            instructorName: {
              type: String,
              required: true,
            },
            roomNumber: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

export const Timetable = mongoose.model("Timetable", timetableSchema);

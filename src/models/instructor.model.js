import mongoose, { Schema } from "mongoose";

const instructorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Link to Course collection
        required: true,
      },
    ],
    availability: [
      {
        day: String,
        timeSlots: [String],
      },
    ],
  },
  { timestamps: true },
);

export const Instructor = mongoose.model("Instructor", instructorSchema);

// Instructor.find().populate("subjects");

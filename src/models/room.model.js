import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    roomType: {
      type: String,
      enum: ["Room", "Laboratory", "Seminar Room", "Computer Lab"],
      default: "Room",
    },
    capacity: {
      type: Number,
      required: true,
    },
    availability: [
      {
        day: String,
        timeSlots: [String],
      },
    ],
    location: {
      type: String,
      enum: ["Main Campus", "Sub Campus"],
      default: "Main Campus",
    },
    equipment: {
      type: String,
      enum: ["Lecture", "Lab"],
      default: "Lecture",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Room = mongoose.model("Room", roomSchema);

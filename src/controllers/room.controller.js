import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Room } from "../models/room.model.js";

// Function to create a new room
export const createRoom = asyncHandler(async (req, res) => {
  try {
    const {
      roomNumber,
      roomType,
      capacity,
      availability,
      location,
      equipment,
      isActive,
    } = req.body;

    // Check if room already exists by roomNumber
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      throw new ApiError(400, "Room already exists with this number");
    }

    // Create the room
    const room = await Room.create({
      roomNumber,
      roomType,
      capacity,
      availability,
      location,
      equipment,
      isActive,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, room, "Room created successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to create room",
    );
  }
});

// Function to get a room by ID
export const getRoom = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, room, "Room retrieved successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to retrieve room",
    );
  }
});

// Function to get all rooms
export const getAllRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find({});

    return res
      .status(200)
      .json(new ApiResponse(200, rooms, "Rooms retrieved successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to retrieve rooms",
    );
  }
});

// Function to update a room by ID
export const updateRoom = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;
    const {
      roomNumber,
      roomType,
      capacity,
      availability,
      location,
      equipment,
      isActive,
    } = req.body;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    // Update the room fields
    room.roomNumber = roomNumber || room.roomNumber;
    room.roomType = roomType || room.roomType;
    room.capacity = capacity || room.capacity;
    room.availability = availability || room.availability;
    room.location = location || room.location;
    room.equipment = equipment || room.equipment;
    room.isActive = typeof isActive === "boolean" ? isActive : room.isActive;

    await room.save();

    return res
      .status(200)
      .json(new ApiResponse(200, room, "Room updated successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to update room",
    );
  }
});

// Function to delete a room by ID
export const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    // Delete the room
    await room.deleteOne({ id: room._id });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Room deleted successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to delete room",
    );
  }
});

export default {
  createRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};

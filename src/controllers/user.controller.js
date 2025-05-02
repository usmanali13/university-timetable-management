import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Function to generate and access refresh tokens
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ ValiditeBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", error.message);
  }
};

// Function to register a new admin
export const registerAdmin = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Only allow Admin registration
    if (role !== "Admin") {
      throw new ApiError(403, "Only admin accounts can be created here");
    }

    // Check for required fields
    if (!username || !email || !password) {
      throw new ApiError(400, "Username, email and password are required");
    }

    // Check for existing admin
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (existingUser) {
      throw new ApiError(409, "Username or email already exists");
    }

    // Create admin
    const adminUser = await User.create({
      username,
      email,
      password,
      role,
    });

    const createdAdmin = await User.findById(adminUser._id).select(
      "-password -refreshToken",
    );

    if (!createdAdmin) {
      throw new ApiError(500, "Admin creation failed");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(adminUser._id);

    return res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json(
        new ApiResponse(
          201,
          { user: createdAdmin, accessToken },
          "Admin registered successfully",
        ),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Admin registration failed",
    );
  }
});

// Function to register a new user
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, role, registrationNumber } = req.body;

    // Only allow Student registration
    if (role !== "Student") {
      throw new ApiError(403, "Only students are allowed to register");
    }

    // Check for required fields
    if (!username || !email || !password || !registrationNumber) {
      throw new ApiError(400, "All fields are required");
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
        { registrationNumber },
      ],
    });

    if (existingUser) {
      throw new ApiError(
        409,
        "Username, email or registration number already exists",
      );
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      role,
      registrationNumber,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json(
        new ApiResponse(
          201,
          { user: createdUser, accessToken },
          "Student registered successfully",
        ),
      );
  } catch (error) {
    // Forward to global error handler
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Registration failed",
    );
  }
});

// Function to login a user
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      throw new ApiError(400, "Username/email and password are required");
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail.toLowerCase() },
        { email: usernameOrEmail.toLowerCase() },
      ],
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Exclude sensitive fields
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      registrationNumber: user.registrationNumber,
    };

    // Send response
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json(
        new ApiResponse(
          200,
          { user: userData, accessToken },
          "Login successful",
        ),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Login failed",
    );
  }
});

// Function to logout a user
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logout successful"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Logout failed",
    );
  }
});

// Function to refresh access token
export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new ApiError(401, "Refresh token not found, please login again");
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user by ID
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user._id,
    );

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json(
        new ApiResponse(200, { accessToken }, "Tokens refreshed successfully"),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to refresh tokens",
    );
  }
});
// Function to get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User profile retrieved"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to retrieve user profile",
    );
  }
});

// Function to update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, registrationNumber } = req.body;

    // Find the user by ID from the decoded JWT (middleware already attaches req.user)
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Update common fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    // Only update registrationNumber if the user is a Student
    if (user.role === "Student" && registrationNumber) {
      user.registrationNumber = registrationNumber;
    }

    // Save updated user info
    await user.save({ validateBeforeSave: false });

    // Prepare response without sensitive data
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.refreshToken;

    return res
      .status(200)
      .json(
        new ApiResponse(200, safeUser, "User profile updated successfully"),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to update user profile",
    );
  }
});

// Function to update user password
export const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if old password is correct
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Update password
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Password updated successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to update password",
    );
  }
});
// Function to delete user account
export const deleteUserAccount = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Optional extra check (defensive)
    if (req.originalUrl.includes("Admin") && user.role !== "Admin") {
      throw new ApiError(
        403,
        "Access denied: Only Admins can access this route",
      );
    }

    if (req.originalUrl.includes("Student") && user.role !== "Student") {
      throw new ApiError(
        403,
        "Access denied: Only Students can access this route",
      );
    }

    await user.deleteOne({ _id: user._id });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "User account deleted successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to delete user account",
    );
  }
});

// Function to handle errors globally
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, null, message, errors));
};

// Export all functions
export default {
  generateTokens,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
  globalErrorHandler,
};

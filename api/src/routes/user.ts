import express from "express";
import {
  getUsers,
  loginUser,
  removeUser,
  signupUser,
} from "../controllers/userController";

export const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Remove user route
router.delete("/", removeUser);

// Get user list (only avalible for admin)
router.get("/", getUsers);

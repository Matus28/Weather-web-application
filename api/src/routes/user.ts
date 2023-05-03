import express from "express";
import {
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
router.delete("/remove", removeUser);

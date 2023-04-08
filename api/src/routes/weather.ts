import express from "express";
import { getWeatherData } from "../controllers/weatherController";

export const router = express.Router();

// GET weather for specific city
router.get("/:location", getWeatherData);

import { Request, Response } from "express";
import fetch from "cross-fetch";
import dotenv from "dotenv";

dotenv.config();

export const getWeatherData = async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=7`;
    const result = await fetch(URL);
    const data = await result.json();
    if (data?.error) throw new Error(data.error.message);
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

import { City } from "../models/cityModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

interface CityRes extends City {
  _id: mongoose.Types.ObjectId;
}

// GET all cities
export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const cities = await City.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(cities);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// GET user's default city
export const getDefaultCity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const city = await City.findOne({ userId, isDefault: true });
    res.status(200).json(city);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// POST new city
export const addCity = async (req: Request, res: Response): Promise<void> => {
  const { cityName } = req.body;
  let isValidName: boolean = false;

  try {
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${cityName}&days=7`;
    const result = await fetch(URL);
    const data = await result.json();
    if (data?.error) throw new Error(data.error.message);
    isValidName = true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  try {
    const userId = req.user._id;
    const exist = await City.findOne({ cityName, userId });
    const city =
      (await isValidName) && !exist && City.create({ cityName, userId });
    res.status(200).json(city);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// PUT = set default city
export const setDefaultCity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cityName, isDefault } = req.body;
  const userId = req.user._id;

  try {
    const result = await City.setDefaultCity(cityName, userId, isDefault);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Delete city
export const deleteCity = async (
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "There is not such city." });
    }

    const city = await City.findOneAndDelete({ _id: id });

    if (!city) {
      return res.status(400).json({ error: "There is not such city." });
    }

    res.status(200).json(city);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

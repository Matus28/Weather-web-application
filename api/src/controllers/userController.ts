import { Request, Response } from "express";
import { User } from "../models/userModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const createToken = (_id: string): string => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: "3d" });
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Signup user
export const signupUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const removeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const { authorization } = req.headers;
  const _idAdmin = "644ea44611143a03901f3e5f";

  if (!authorization) {
    return;
  }

  const token = authorization.replace("Bearer ", "");
  const { _id } = jwt.verify(
    token,
    process.env.SECRET as jwt.Secret
  ) as jwt.JwtPayload;

  if (_id !== _idAdmin) {
    return;
  }

  try {
    const user = await User.deleteOne({ email: email });
    res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

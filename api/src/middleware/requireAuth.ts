import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Add user property to Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(
      token,
      process.env.SECRET as jwt.Secret
    ) as jwt.JwtPayload;

    // attach user property to request (for another middleware)
    req.user = (await User.findOne({ _id }).select("_id")) ?? "";
    next();
  } catch (error: unknown) {
    res.status(401).json({ error: "Request is not authorized." });
  }
};

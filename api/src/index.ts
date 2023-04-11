import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { router as cityRoutes } from "./routes/cities";
import { router as weatherRoutes } from "./routes/weather";
import { router as userRoutes } from "./routes/user";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

// APP creating
const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
    origin: [
      "https://weather-web-application-app.vercel.app/",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/cities", cityRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/user", userRoutes);

// Connection to DB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    // Listen for request
    app.listen(process.env.PORT, () => {
      console.log(
        `[api]: Connected to DB & Server is running at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;

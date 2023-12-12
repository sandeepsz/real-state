import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/list.route.js";
import cookieParser from "cookie-parser";

// initialize express
const app = express();

// connect to database
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

// express.json is used to parse the request body
app.use(express.json());

// cookir parser is used to parse the cookie from the request header
app.use(cookieParser());

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

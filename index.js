import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// CONFIGURATIONS.....
const app = express();
dotenv.config();

// DB CONNECTION
const connect = () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Database.");
  } catch (error) {
    console.log(error.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

// MIDDLEWARES
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// SERVER CONFIGURATION...
app.listen(PORT, () => {
  connect();
  console.log(`Server listening on PORT: ${PORT}`);
});

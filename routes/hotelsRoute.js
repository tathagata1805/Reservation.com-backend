import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotelRooms,
  getHotel,
  getHotels,
  updatedHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updatedHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
router.get("/find/:id", getHotel);

// GET HOTEL COUNTS
router.get("/", getHotels);

// GET HOTELS BY FILTERS OF CITY AND TYPE
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);


export default router;

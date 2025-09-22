import express from "express";
import { getAllSpeedruners, getSpeedrunersByID, createSpeedruner, deleteSpeedruner, updateSpeedruner } from "../controllers/speedrunerController.js";

const router = express.Router();

router.get("/", getAllSpeedruners)
router.get("/:id", getSpeedrunersByID)
router.post("/", createSpeedruner)
router.delete("/:id", deleteSpeedruner)
router.put("/:id", updateSpeedruner)

export default router
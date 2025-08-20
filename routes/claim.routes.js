import express from "express";
import { claimPoints } from "../controllers/claim.contoller.js";

const router = express.Router();

router.post("/", claimPoints);  // Claim random points

export default router;

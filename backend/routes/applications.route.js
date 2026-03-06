import express from "express";
import {
  submitApplication,
  getApplicationsByJob,
} from "../controllers/applications.controller.js";

const router = express.Router();

router.post("/", submitApplication);
router.get("/:job_id", getApplicationsByJob);

export default router;

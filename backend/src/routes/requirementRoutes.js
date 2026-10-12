import { Router } from "express";
import {
  createRequirement,
  getRequirement
} from "../controllers/requirementController.js";
import { validateRequirement } from "../middleware/validateRequirement.js";

const router = Router();

router.post("/", validateRequirement, createRequirement);
router.get("/:id", getRequirement);

export default router;

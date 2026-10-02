import express from "express";
import About from "../models/About.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/about — public. Creates an empty doc on first run so the
// frontend always has something to fetch.
router.get("/", async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({});
  }
  res.json(about);
});

// PUT /api/about — admin only, updates the single About document
router.put("/", requireAuth, async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create(req.body);
  } else {
    about = await About.findByIdAndUpdate(about._id, req.body, {
      new: true,
      runValidators: true
    });
  }
  res.json(about);
});

export default router;

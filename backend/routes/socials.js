import express from "express";
import Social from "../models/Social.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const socials = await Social.find().sort({ order: 1, createdAt: 1 });
  res.json(socials);
});

router.post("/", requireAuth, async (req, res) => {
  const social = await Social.create(req.body);
  res.status(201).json(social);
});

router.put("/:id", requireAuth, async (req, res) => {
  const social = await Social.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!social) return res.status(404).json({ message: "Social not found" });
  res.json(social);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const social = await Social.findByIdAndDelete(req.params.id);
  if (!social) return res.status(404).json({ message: "Social not found" });
  res.json({ message: "Deleted" });
});

export default router;

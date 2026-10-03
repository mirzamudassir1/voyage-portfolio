import express from "express";
import Certification from "../models/Certification.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const certs = await Certification.find().sort({ order: 1, createdAt: 1 });
  res.json(certs);
});

router.post("/", requireAuth, async (req, res) => {
  const cert = await Certification.create(req.body);
  res.status(201).json(cert);
});

router.put("/:id", requireAuth, async (req, res) => {
  const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!cert) return res.status(404).json({ message: "Certification not found" });
  res.json(cert);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const cert = await Certification.findByIdAndDelete(req.params.id);
  if (!cert) return res.status(404).json({ message: "Certification not found" });
  res.json({ message: "Deleted" });
});

export default router;
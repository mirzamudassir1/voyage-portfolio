import express from "express";
import Project from "../models/Project.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/projects — public, sorted for the voyage
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: 1 });
  res.json(projects);
});

// POST /api/projects — admin only
router.post("/", requireAuth, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

// PUT /api/projects/:id — admin only
router.put("/:id", requireAuth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

// DELETE /api/projects/:id — admin only
router.delete("/:id", requireAuth, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Deleted" });
});

export default router;

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, required: true },
    tech: { type: [String], default: [] },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    // Controls left-to-right position along the voyage
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

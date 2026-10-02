import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    education: { type: String, default: "" },
    skills: { type: [String], default: [] },
    resumeUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

// Only one About document should ever exist — routes enforce this.
export default mongoose.model("About", aboutSchema);

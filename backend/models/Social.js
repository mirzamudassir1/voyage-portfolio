import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // e.g. "GitHub", "LinkedIn", "Email"
    url: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Social", socialSchema);

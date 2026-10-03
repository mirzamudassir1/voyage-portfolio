// Run once with `npm run seed` to create your admin login and (optionally)
// a couple of sample projects so the voyage isn't empty on first load.
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";
import Project from "./models/Project.js";
import Social from "./models/Social.js";
import About from "./models/About.js";
import Certification from "./models/Certification.js";
import mongoose from "mongoose";

dotenv.config();

async function seed() {
  await connectDB();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error("Set ADMIN_USERNAME and ADMIN_PASSWORD in .env before seeding.");
    process.exit(1);
  }

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" already exists — skipping admin creation.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ username, passwordHash });
    console.log(`Admin "${username}" created.`);
  }

  const aboutExists = await About.findOne();
  if (!aboutExists) {
    await About.create({
      name: "Mirza",
      tagline: "Final-year AI & Data Science student — building things that ship.",
      bio: "Write your story here from the admin dashboard.",
      education: "B.Tech, AI & Data Science, Aalim Muhammed Salegh College of Engineering",
      skills: ["React", "Node.js", "MongoDB", "Python", "Machine Learning"]
    });
    console.log("Sample About document created.");
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.create([
      {
        title: "QuizPro",
        tagline: "Full-stack exam management platform",
        description: "A MERN exam management platform with a custom math/chemistry rich-text editor.",
        tech: ["React", "Node.js", "MongoDB", "Express"],
        order: 1
      },
      {
        title: "The Cracker City",
        tagline: "Fireworks e-commerce site",
        description: "Live e-commerce store built for a friend's fireworks business.",
        tech: ["React", "Node.js", "MongoDB"],
        order: 2
      }
    ]);
    console.log("Sample projects created.");
  }

  const socialCount = await Social.countDocuments();
  if (socialCount === 0) {
    await Social.create([
      { platform: "GitHub", url: "https://github.com/mirzamudassir1", order: 1 },
      { platform: "LinkedIn", url: "https://linkedin.com/in/your-handle", order: 2 }
    ]);
    console.log("Sample socials created.");
  }

  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.create([
      {
        title: "Sample Certification — edit me in Captain's Quarters",
        issuer: "Issuer name",
        date: "2025",
        order: 1
      }
    ]);
    console.log("Sample certification created.");
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seed();

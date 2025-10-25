import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./data.json";

// Helper to read stored profiles
function readProfiles() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to save profiles
function writeProfiles(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST create
app.post("/api/profiles", (req, res) => {
  const profiles = readProfiles();
  const newProfile = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
  profiles.push(newProfile);
  writeProfiles(profiles);
  res.status(201).json(newProfile);
});

// GET all
app.get("/api/profiles", (req, res) => {
  const profiles = readProfiles();
  res.json(profiles.reverse());
});

// GET single
app.get("/api/profiles/:id", (req, res) => {
  const profiles = readProfiles();
  const found = profiles.find(p => p.id === req.params.id);
  if (!found) return res.status(404).json({ error: "Profile not found" });
  res.json(found);
});

// PUT update
app.put("/api/profiles/:id", (req, res) => {
  const profiles = readProfiles();
  const index = profiles.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Profile not found" });
  profiles[index] = { ...profiles[index], ...req.body, updatedAt: new Date().toISOString() };
  writeProfiles(profiles);
  res.json(profiles[index]);
});

// DELETE
app.delete("/api/profiles/:id", (req, res) => {
  let profiles = readProfiles();
  profiles = profiles.filter(p => p.id !== req.params.id);
  writeProfiles(profiles);
  res.json({ message: "Deleted successfully" });
});

// sanity check
app.get("/", (req, res) => {
  res.send("Portfolio API with File Storage 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));

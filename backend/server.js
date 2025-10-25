require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory store (replace with DB in production)
const profiles = [];

// POST create profile
app.post("/api/profiles", (req, res) => {
  const data = req.body;
  const id = uuidv4();
  const created = { id, createdAt: new Date().toISOString(), ...data };
  profiles.push(created);
  res.status(201).json(created);
});

// GET all profiles
app.get("/api/profiles", (req, res) => {
  // Optional filtering by skill or role via query
  const { skill, role } = req.query;
  let result = profiles.slice().reverse(); // newest first
  if (skill) {
    result = result.filter(p => (p.skills || []).includes(skill));
  }
  if (role) {
    result = result.filter(p => p.hero?.title?.toLowerCase().includes(role.toLowerCase()));
  }
  res.json(result);
});

// GET single profile
app.get("/api/profiles/:id", (req, res) => {
  const p = profiles.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

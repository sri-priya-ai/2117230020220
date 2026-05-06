const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Log = require("./log");

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* ---------- ROUTES ---------- */

// Test route
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root API called");
  res.send("Backend running");
});

// Notification API
app.post("/notify", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      await Log("backend", "error", "handler", "Message missing");
      return res.status(400).json({ error: "Message required" });
    }

    await Log("backend", "info", "controller", "Notification received");
    await Log("backend", "debug", "service", "Processing notification");

    res.json({ success: true, message: "Notification sent" });

  } catch (err) {
    await Log("backend", "fatal", "handler", "Unexpected error");
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------- SERVER ---------- */

app.listen(3000, async () => {
  console.log("Server running on http://localhost:3000");
  await Log("backend", "info", "service", "Server started");
});
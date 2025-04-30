const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { spawn } = require("child_process");

const authRoutes = require("./routes/auth");
const tutorialRoutes = require("./routes/tutorial");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/tutorials", express.static(path.join(__dirname, "tutorials"))); // static files if needed

// Serve frontend
app.use(express.static(path.join(__dirname, "public"))); // built React files go here

// React routing fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => console.log("Server running on port 5001"));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// --- Predict from log data ---
app.post("/api/predict-log", (req, res) => {
  const py = spawn("python", ["./models/predict.py"]);
  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let result = "";
  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  py.on("close", (code) => {
    try {
      res.json({ prediction: parseInt(result.trim()) });
    } catch (err) {
      res.status(500).json({ error: "Prediction failed" });
    }
  });
});

// --- Predict from document features ---
app.post("/api/predict-doc", (req, res) => {
  const py = spawn("python", ["./models/predict_doc.py"]);
  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let result = "";
  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  py.on("close", (code) => {
    res.json({ prediction: result.trim() });
  });
});

// --- Predict from image path ---
app.post("/api/predict-img", (req, res) => {
  const py = spawn("python", ["./models/predict_img.py"]);
  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let result = "";
  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  py.on("close", (code) => {
    try {
      res.json(JSON.parse(result));
    } catch (e) {
      res.status(500).json({ error: "Invalid image prediction output" });
    }
  });
});

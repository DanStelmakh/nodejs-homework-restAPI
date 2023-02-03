const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const filePath = path.join(__dirname, "public");
const fileDir = path.join(__dirname, "public", "avatar");

require("dotenv").config();

// Multer config
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 1048576 },
});
// multer start
const upload = multer({
  storage: multerConfig,
});

const authRouters = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// upload
app.use(express.static(filePath));

// Auth routers
app.use("/api/users", authRouters);
// Contacts routers
app.use("/api/contacts", contactsRouter);
// Upload files routers
app.post("/upload", upload.single("avatar"), async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const fullFilePath = path.join(fileDir, originalname);
  fs.rename(tempUpload, fullFilePath);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;

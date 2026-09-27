require("dotenv").config();
const express = require("express");
const path = require("path");
const statusRoute = require("./routes/status");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Statische Dateien aus dem public-Ordner ausliefern (Frontend)
app.use(express.static(path.join(__dirname, "..", "public")));

// API-Routen
app.use("/api", statusRoute);

app.listen(PORT, () => {
  console.log(`Pellicula-Server läuft auf http://localhost:${PORT}`);
});

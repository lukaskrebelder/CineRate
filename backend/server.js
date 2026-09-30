require("dotenv").config();
const express = require("express");
const cors = require("cors");
const statusRoute = require("./routes/status");

const app = express();
const PORT = process.env.PORT || 3000;

// Reines API-Backend: liefert nur noch JSON aus, kein Frontend mehr.
// CORS erlaubt Anfragen vom separaten Frontend (eigenes Repo/eigene Adresse).
// FRONTEND_URL in der .env setzen, sobald das Frontend eine feste Adresse hat
// (z. B. https://cinerate-frontend.herokuapp.com); ohne gesetzten Wert sind
// Anfragen von überall erlaubt (praktisch für die lokale Entwicklung).
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());

// API-Routen
app.use("/api", statusRoute);

app.listen(PORT, () => {
  console.log(`CineRate-Backend läuft auf http://localhost:${PORT}`);
});

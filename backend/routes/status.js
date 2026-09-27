// Beispiel-Route, die zeigt, dass Backend + Datenbank erreichbar sind
const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/status", (req, res) => {
  const filmCount = db.prepare("SELECT COUNT(*) AS anzahl FROM Film").get();
  res.json({
    status: "ok",
    nachricht: "CinneTax-Backend läuft",
    filmeInDb: filmCount.anzahl,
  });
});

module.exports = router;

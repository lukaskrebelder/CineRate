// Basis-URL des Backends. Lokal: der laufende Node-Server (Standardport 3000).
// Nach dem Deployment auf Heroku hier die echte Backend-URL eintragen,
// z. B. "https://cinerate-backend.herokuapp.com".
const API_BASE_URL = "http://localhost:3000";

fetch(`${API_BASE_URL}/api/status`)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("status").textContent =
      data.nachricht + " (Filme in DB: " + data.filmeInDb + ")";
  })
  .catch(() => {
    document.getElementById("status").textContent = "Backend nicht erreichbar";
  });

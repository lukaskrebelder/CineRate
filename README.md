# Pellicula

IMDB-ähnliche Filmbewertungsseite mit TMDB-API-Anbindung (Fallstudie Software Engineering, WS 2026/27).

## Setup

1. Abhängigkeiten installieren:
   ```
   npm install
   ```

2. `.env.example` zu `.env` kopieren und den eigenen TMDB-API-Key eintragen:
   ```
   cp .env.example .env
   ```

3. Datenbank initialisieren (einmalig, legt `backend/db/pellicula.db` an):
   ```
   node backend/db/init.js
   ```

4. Server starten:
   ```
   node backend/server.js
   ```

5. Im Browser öffnen: [http://localhost:3000](http://localhost:3000)

## Tech-Stack

- Frontend: HTML / CSS / Vanilla JavaScript (`public/`)
- Backend: Node.js + Express (`backend/`)
- Datenbank: SQLite (über `better-sqlite3`)

## Projektstruktur

```
backend/
  server.js        Express-Server, bindet Routen ein
  routes/           API-Routen
  db/
    init.js         legt das Datenbankschema an
    connection.js    zentrale DB-Verbindung
public/
  index.html
  style.css
  script.js
.env.example        Vorlage für Umgebungsvariablen
```

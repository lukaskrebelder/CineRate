# CineRate

IMDB-ähnliche Filmbewertungsseite mit TMDB-API-Anbindung (Fallstudie Software Engineering, WS 2026/27).

Backend und Frontend sind entkoppelt (API-First-Prinzip): Das Backend liefert
ausschließlich JSON über eine REST-API, das Frontend ruft diese über eine feste
Basis-URL auf. Beide können unabhängig voneinander deployed werden (z. B. Backend
auf Heroku, Frontend separat).

## Setup (lokale Entwicklung)

1. Abhängigkeiten installieren:
   ```
   npm install
   ```

2. `.env.example` zu `.env` kopieren und Werte eintragen (TMDB-Key, lokale PostgreSQL-Verbindung):
   ```
   cp .env.example .env
   ```

3. Eine lokale PostgreSQL-Datenbank anlegen (z. B. `cinerate`), dann Schema initialisieren:
   ```
   node backend/db/init.js
   ```

4. Backend starten:
   ```
   node backend/server.js
   ```
   Läuft auf [http://localhost:3000](http://localhost:3000) und liefert nur JSON.

5. Frontend separat ausliefern, z. B. mit einem einfachen Static-Server:
   ```
   npx serve public
   ```
   oder mit der VS-Code-Erweiterung "Live Server". `public/script.js` zeigt per
   `API_BASE_URL` auf das Backend.

## Deployment auf Heroku

1. Heroku-App für das Backend anlegen, Heroku-Postgres-Add-on hinzufügen
   (setzt `DATABASE_URL` automatisch).
2. Umgebungsvariablen setzen: `heroku config:set TMDB_API_KEY=...`
3. Schema einmalig auf Heroku initialisieren: `heroku run node backend/db/init.js`
4. Deployen: `git push heroku main`
5. In `public/script.js` die `API_BASE_URL` auf die Heroku-Backend-URL anpassen.

## Tech-Stack

- Frontend: HTML / CSS / Vanilla JavaScript (`public/`)
- Backend: Node.js + Express (`backend/`), reine REST-API
- Datenbank: PostgreSQL (über `pg`)

## Projektstruktur

```
backend/
  server.js        Express-Server (reine API, CORS aktiviert)
  routes/           API-Routen
  db/
    init.js         legt das PostgreSQL-Schema an
    connection.js    zentrale DB-Verbindung (pg Pool)
public/
  index.html
  style.css
  script.js         ruft die API über API_BASE_URL auf
Procfile            Startbefehl für Heroku
.env.example        Vorlage für Umgebungsvariablen
```

// Initialisiert das PostgreSQL-Schema für CineRate
// Ausführen mit: node backend/db/init.js
// (lokal: braucht eine laufende PostgreSQL-Instanz und DATABASE_URL in .env;
//  auf Heroku: einmalig mit `heroku run node backend/db/init.js` ausführen)

require("dotenv").config();
const pool = require("./connection");

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Nutzer (
      id SERIAL PRIMARY KEY,
      benutzername TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      passwort_hash TEXT NOT NULL,
      rolle TEXT NOT NULL DEFAULT 'Nutzer' CHECK (rolle IN ('Nutzer', 'Moderator', 'Admin')),
      erstellt_am TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS Film (
      id SERIAL PRIMARY KEY,
      tmdb_id INTEGER NOT NULL UNIQUE,
      titel TEXT NOT NULL,
      beschreibung TEXT,
      erscheinungsjahr INTEGER,
      poster_pfad TEXT,
      laufzeit INTEGER,
      erstellt_am TIMESTAMP NOT NULL DEFAULT NOW(),
      aktualisiert_am TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS Genre (
      id SERIAL PRIMARY KEY,
      tmdb_genre_id INTEGER NOT NULL UNIQUE,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Film_Genre (
      film_id INTEGER NOT NULL REFERENCES Film(id) ON DELETE CASCADE,
      genre_id INTEGER NOT NULL REFERENCES Genre(id) ON DELETE CASCADE,
      PRIMARY KEY (film_id, genre_id)
    );

    CREATE TABLE IF NOT EXISTS Bewertung (
      id SERIAL PRIMARY KEY,
      nutzer_id INTEGER NOT NULL REFERENCES Nutzer(id) ON DELETE CASCADE,
      film_id INTEGER NOT NULL REFERENCES Film(id) ON DELETE CASCADE,
      punktzahl INTEGER NOT NULL CHECK (punktzahl BETWEEN 1 AND 10),
      rezensionstext TEXT,
      erstellt_am TIMESTAMP NOT NULL DEFAULT NOW(),
      aktualisiert_am TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE (nutzer_id, film_id)
    );
  `);

  console.log("PostgreSQL-Schema wurde initialisiert.");
  await pool.end();
}

init().catch((err) => {
  console.error("Fehler beim Initialisieren der Datenbank:", err.message);
  process.exit(1);
});

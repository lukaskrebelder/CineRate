// Initialisiert die SQLite-Datenbank mit dem Grundschema für Pellicula
// Ausführen mit: node backend/db/init.js

const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "pellicula.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS Nutzer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    benutzername TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    passwort_hash TEXT NOT NULL,
    rolle TEXT NOT NULL DEFAULT 'Nutzer' CHECK (rolle IN ('Nutzer', 'Moderator', 'Admin')),
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Film (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tmdb_id INTEGER NOT NULL UNIQUE,
    titel TEXT NOT NULL,
    beschreibung TEXT,
    erscheinungsjahr INTEGER,
    poster_pfad TEXT,
    laufzeit INTEGER,
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now')),
    aktualisiert_am TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Genre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tmdb_genre_id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Film_Genre (
    film_id INTEGER NOT NULL REFERENCES Film(id) ON DELETE CASCADE,
    genre_id INTEGER NOT NULL REFERENCES Genre(id) ON DELETE CASCADE,
    PRIMARY KEY (film_id, genre_id)
  );

  CREATE TABLE IF NOT EXISTS Bewertung (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nutzer_id INTEGER NOT NULL REFERENCES Nutzer(id) ON DELETE CASCADE,
    film_id INTEGER NOT NULL REFERENCES Film(id) ON DELETE CASCADE,
    punktzahl INTEGER NOT NULL CHECK (punktzahl BETWEEN 1 AND 10),
    rezensionstext TEXT,
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now')),
    aktualisiert_am TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (nutzer_id, film_id)
  );
`);

console.log("Datenbank wurde initialisiert unter:", dbPath);
db.close();

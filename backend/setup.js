const db = require('./models/db');

const setup = `
-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  isAdmin INTEGER DEFAULT 0
);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  location TEXT,
  date TEXT,
  lon FLOAT,
  lat FLOAT,
  description TEXT
);

-- TICKETS
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventID INTEGER,
  ticketType TEXT,
  price REAL,
  availability INTEGER
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventID INTEGER,
  ticketType TEXT,
  username TEXT,
  quantity INTEGER
);
`;

db.exec(setup, (err) => {
    if (err) console.error("Setup error:", err.message);
    else console.log("Database tables created successfully");
});
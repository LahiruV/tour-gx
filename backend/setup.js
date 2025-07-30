const db = require('./models/db');

const setup = `
-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  password TEXT,
  email TEXT,
  isAdmin INTEGER DEFAULT 0
);

-- PACKAGES
CREATE TABLE IF NOT EXISTS packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  image TEXT,
  price TEXT,
  duration TEXT,
  groupSize TEXT,
  startDate TEXT
);

-- FEEDBACKS
CREATE TABLE feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    serviceRating REAL,
    country TEXT
);

`;

db.exec(setup, (err) => {
  if (err) console.error("Setup error:", err.message);
  else console.log("Database tables created successfully");
});
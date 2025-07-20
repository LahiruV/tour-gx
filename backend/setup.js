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
`;

db.exec(setup, (err) => {
  if (err) console.error("Setup error:", err.message);
  else console.log("Database tables created successfully");
});
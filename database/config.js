const Database = require("better-sqlite3");
const db = new Database("database.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  password TEXT
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  user_id INTEGER
)
`).run();
module.exports = db;
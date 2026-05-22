const db = require("./config");

// USERS
db.prepare("DROP TABLE IF EXISTS users").run();
db.prepare(`
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  password TEXT
)
`).run();

// TASKS
db.prepare("DROP TABLE IF EXISTS tasks").run();
db.prepare(`
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  user_id INTEGER
)
`).run();

console.log("Baza (users + tasks) resetovana");
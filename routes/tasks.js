const express = require("express");
const router = express.Router();
const db = require("../database/config");
const auth = require("../middleware/auth");


//CREATE TASK
router.post("/", auth, (req, res) => {
  const { title } = req.body;

  const result = db
    .prepare("INSERT INTO tasks (title, user_id) VALUES (?, ?)")
    .run(title, req.user.id);

  res.json({
    id: result.lastInsertRowid,
    title
  });
});


//GET SVI TASKOVI (SAMO TVOJI)
router.get("/", auth, (req, res) => {
  const tasks = db
    .prepare("SELECT * FROM tasks WHERE user_id = ?")
    .all(req.user.id);

  res.json(tasks);
});


//DELETE TASK (SAMO AKO JE TVOJ)
router.delete("/:id", auth, (req, res) => {
  const result = db
    .prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?")
    .run(req.params.id, req.user.id);

  if (result.changes === 0) {
    return res.status(404).send("Task ne postoji ili nije tvoj");
  }

  res.send("Task obrisan");
});


module.exports = router;
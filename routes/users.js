const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../database/config");
const userSchema = require("../validation/userSchema");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Ovo vidi samo loginovan user",
    user: req.user
  });
});

router.post("/register", (req, res) => {

  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map(e => e.message)
    });
  }

  const { name, password } = result.data;

  // HASH passworda
  const hashedPassword = bcrypt.hashSync(password, 10);

  // upis u bazu
  const dbResult = db
    .prepare("INSERT INTO users (name, password) VALUES (?, ?)")
    .run(name, hashedPassword);

  res.json({
    id: dbResult.lastInsertRowid,
    name
  });

});
router.post("/login", (req, res) => {
  const { name, password } = req.body;

  // 1. Provjeri da li user postoji
  const user = db
    .prepare("SELECT * FROM users WHERE name = ?")
    .get(name);

  if (!user) {
    return res.status(400).json({
      error: "pogrijesili ste username ili sifru"
    });
  }

  // 2. Provjeri password
  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return res.status(400).json({
      error: "pogrijesili ste username ili sifru"
    });
  }

  // 3. Generiši token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name
    },
    "tajni_kljuc",
    { expiresIn: "1h" }
  );

  // 4. Vrati token
  res.json({
  //  message: "Login uspješan",
    token
  });
});
// GET
router.get("/", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

// POST
router.post("/", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map(e => e.message)
    });
  }

  const { name } = result.data;

  const dbResult = db
    .prepare("INSERT INTO users (name) VALUES (?)")
    .run(name);

  res.json({
    id: dbResult.lastInsertRowid,
    name
  });
});

// PUT
router.put("/:id", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map(e => e.message)
    });
  }

  const { name } = result.data;
  const id = req.params.id;

  const dbResult = db
    .prepare("UPDATE users SET name=? WHERE id=?")
    .run(name, id);

  if (dbResult.changes === 0) {
    return res.status(404).send("User not found");
  }

  res.send("User updated");
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const dbResult = db
    .prepare("DELETE FROM users WHERE id=?")
    .run(id);

  if (dbResult.changes === 0) {
    return res.status(404).send("User not found");
  }

  res.send("User deleted");
});

module.exports = router;
const express = require("express");
const app = express();

app.use(express.json());

const tasksRoutes = require("./routes/tasks");

app.use("/tasks", tasksRoutes);

const usersRoutes = require("./routes/users");

// koristi rute
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("test test test");
});
app.get("/about", (req, res) => {
  res.send("test test test");
});
app.get("/kontakt", (req, res) => {
  res.send("test test test");
});

const PORT = 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
  });
}

module.exports = app;


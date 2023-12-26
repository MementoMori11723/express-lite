const express = require("express");
const app = express();
const { Insert, Select } = require("./database");

app.get("/", (req, res) => {
  res.send("<h1>Hi, Welcome to express-lite!</h1>");
});
app.get("/:name/:number", (req, res) => {
  Insert([req.params.name, req.params.number]);
});

app.get("/fetch", (req, res) => {
  Select();
});
app.listen(3000, () =>
  console.log("Running app!\ngo to http://localhost:3000")
);

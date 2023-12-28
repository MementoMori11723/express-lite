const express = require("express");
const serverless = require("serverless-http");
const app = express();
const { Insert, Select, Create } = require("./database");
const router = express.Router();

Create();

router.get("/", (req, res) => {
  res.send("<h1>Hi, Welcome to express-lite!</h1>");
});

router.get("/:name/:number", (req, res) => {
  let result = Insert([req.params.name, req.params.number]);
  res.send(`<h1>${result}</h1>`);
});

router.get("/fetch", (req, res) => {
  Select()
    .then((data) => {
      console.log("here is your data : ");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

const express = require("express");
const app = express();

var cors = require('cors');
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("It Worked!");
});

module.exports = app;
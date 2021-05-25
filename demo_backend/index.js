"use strict";

const express = require("express");
const { getLocation, getAll } = require("./src/controller/controller");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("build"));
app.get("/getLocation", getLocation);

app.get("/getAll", getAll);

const server = app.listen(PORT, () => {
  console.log(`server is run on port ${PORT}`);
});

server.setTimeout(5000000);

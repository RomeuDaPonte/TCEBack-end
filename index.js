const winston = require("winston");
const express = require("express");
const config = require("config");

const app = express();

require("./startup/environmentVariablesInfo")();
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/seedBd")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  winston.info(`Running on port ${port}`);
});

module.exports = server;

const winston = require("winston");
const config = require("config");

module.exports = function () {
  if (!config.get("appMail")) {
    winston.info("App amil undefined, cannot use send mail functionality!");
  }
  if (!config.get("appMailPassword"))
    winston.info(
      "Password for the app mail undefined, cannot use send mail functionality!"
    );
};

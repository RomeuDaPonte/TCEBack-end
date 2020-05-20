const express = require("express");
const account = require("../routes/account");
const expense = require("../routes/expense");
const authentication = require("../middleware/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/account", account);
  app.use(authentication);
  app.use("/api/expense", expense);
};

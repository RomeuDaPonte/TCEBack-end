const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { Expense, validateNewExpense } = require("../models/expense");

router.post("/", async (req, res) => {
  const { error } = validateNewExpense(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { _id } = jwt.verify(
    req.header("x-auth-token"),
    config.get("jwtPrivateKey")
  );

  if (_id !== req.body.userId) res.status(400).send("Not allowed");

  const expense = new Expense({ ...req.body });
  await expense.save();

  res.send(expense);
});

module.exports = router;

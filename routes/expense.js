const express = require("express");
const router = express.Router();
const { Expense, validateNewExpense } = require("../models/expense");

router.post("/", async (req, res) => {
  const { error } = validateNewExpense(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const expense = new Expense({ ...req.body });
  await expense.save();

  res.send(expense);
});

module.exports = router;

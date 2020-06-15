const express = require("express");
const router = express.Router();
const {
  Expense,
  validateNewExpense,
  getTotalAmonth,
} = require("../models/expense");

const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateNewExpense(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const expense = new Expense({ ...req.body });
  await expense.save();

  res.send(expense);
});

router.get("/getAllByDate/:userId", async (req, res) => {
  const exists = await User.findOne({ _id: req.params.userId });
  if (!exists) return res.status(400).send("Invalid user id");

  var date = new Date();
  var firstDayInCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const arrayOfAmounts = await Expense.find()
    .and({ userId: req.params.userId })
    .and({ date: { $gt: firstDayInCurrentMonth } })
    .sort({ date: -1 })
    .select({ __v: 0 });

  res.send(arrayOfAmounts);
});

module.exports = router;

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

router.get("/getTotalSpentByDate", async (req, res) => {
  const exists = await User.findOne({ _id: req.body.userId });
  if (!exists) return res.status(400).send("Invalid user id");

  var date = new Date();
  var firstDayInCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const arrayOfAmounts = await Expense.find()
    .and({ userId: req.body.userId })
    .and({ date: { $gt: firstDayInCurrentMonth } })
    .select({ amount: 1 })
    .select({ _id: 0 });

  const totalAmount = {
    totalSpent: getTotalAmonth(arrayOfAmounts),
  };

  res.send(totalAmount);
});

module.exports = router;

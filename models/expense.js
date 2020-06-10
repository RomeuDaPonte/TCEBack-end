const mongose = require("mongoose");
const Joi = require("@hapi/joi");

const expenseSchema = new mongose.Schema({
  userId: {
    type: mongose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

const Expense = mongose.model("Expense", expenseSchema);

function validateNewExpense(expense) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    source: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().allow("", null),
    date: Joi.date().iso(),
    isPaid: Joi.boolean(),
    paymentMethod: Joi.string().required(),
  });

  return schema.validate(expense);
}

function getTotalAmonth(listOfAmounts) {
  let total = 0;
  listOfAmounts.forEach((element) => {
    total += element.amount;
  });
  return total;
}

exports.Expense = Expense;
exports.validateNewExpense = validateNewExpense;
exports.getTotalAmonth = getTotalAmonth;

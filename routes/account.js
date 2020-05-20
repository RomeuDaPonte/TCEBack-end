const jwt = require("jsonwebtoken");
const config = require("config"); // video 133
const bcrypt = require("bcrypt"); // video 128
const express = require("express");
const router = express.Router();
const { sendEmail } = require("../helpers/email");
const {
  User,
  validateRegister,
  validateLogin,
  emailConfirmationBody,
} = require("../models/user");

router.post("/register", async (req, res) => {
  if (!req.body.token) return res.status(400).send("Token not found");
  const { email } = jwt.verify(req.body.token, config.get("jwtPrivateKey"));
  if (email !== req.body.email) return res.status(400).send("Invalid email");
  delete req.body.token;

  const exists = await User.findOne({ email: req.body.email });
  if (exists) return res.status(400).send("Email already registered");

  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({ ...req.body });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  return res.send(user.generateAuthToken());
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Imail ou password inválido!");

  const validPassword = await user.checkPassword(req.body.password);
  if (!validPassword) return res.status(400).send("Password incorreta!");

  const token = user.generateAuthToken();
  return res.send(token);
});

router.post("/emailConfirmation", async (req, res) => {
  const emailAlreadyExists = await User.findOne({ email: req.body.email });

  if (emailAlreadyExists)
    return res.status(400).send("Email já existe na base de dados");

  return sendEmail(
    req.body.email,
    "Email confirmation",
    emailConfirmationBody(req.body.email)
  )
    .then(() => res.send(`Foi enviado um email para ${req.body.email}`))
    .catch((ex) => res.send(ex));
});

module.exports = router;

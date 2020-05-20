const mongoose = require("mongoose");
const winston = require("winston");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  // video 135
  const token = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, same) => {
      if (err) return reject(err);
      return resolve(same);
    });
  });
};

const User = mongoose.model("User", userSchema);

function validateRegister(user) {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(5).max(255).required(),
    passwordConfirmation: Joi.ref("password"),
  });

  return schema.validate(user);
}

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

function emailConfirmationBody(email) {
  const emailToken = jwt.sign(
    {
      email,
    },
    config.get("jwtPrivateKey")
  );

  const url = `http://127.0.0.1:8080/newAccount.html?${emailToken}`;

  return `
    <h3>Confirmação de conta na PhotosApp</h3>
    Clique aqui para confirma o email: <a href="${url}">${url}</a>
  `;
}

async function createAdminUser() {
  const user = await User.findOne({ email: "userlogado@gmail.com" });

  if (user) {
    winston.info("Admon user já existe na bd");
    return;
  }

  const adminUser = new User({
    userName: "User Logado",
    email: "userlogado@gmail.com",
    password: "$2b$10$fSMIGpdKqJ8Eqmkf4NAWEu0hGnkNRaexlLWKeI0kSuMFdnrryjUKy",
  });

  await adminUser.save();
  winston.info("Admin user criado com sucesso");
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
exports.createAdminUser = createAdminUser;
exports.emailConfirmationBody = emailConfirmationBody;

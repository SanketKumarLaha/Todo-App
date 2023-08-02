const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Both fields must be filled");
  }
  if (!validator.isStrongPassword) {
    throw Error("The password is not strong enough");
  }
  if (!validator.isEmail) {
    throw Error("The email is not valid");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await this.create({ email, password: hash });
  return newUser;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Both fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email doesn't exist");
  }
  const isRightPassword = await bcrypt.compare(password, user.password);
  if (!isRightPassword) {
    throw Error("Wrong password");
  }
  return user;
};

module.exports = mongoose.model("user", UserSchema);

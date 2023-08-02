const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try { 
    const newUser = await User.signup(email, password);
    const token = createToken(newUser._id);
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await User.login(email, password);
    const token = createToken(newUser._id);
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };

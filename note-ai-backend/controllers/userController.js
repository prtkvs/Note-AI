const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { constants } = require("../errorConstants");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  console.log("Registering new user");
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are required");
  }
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(constants.CONFLICT);
    throw new Error("User with this email or username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10); // salt rounds means 10 times hashing for security
  console.log("Hashed Password:", hashedPassword);
  const newUser = new User({ name, username, email, password: hashedPassword });
  const id = uuidv4();
  newUser.userId = id;
  console.log(newUser);
  await newUser.save();
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: newUser,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  res.send("User login");
});

// private
const currentUser = asyncHandler(async (req, res) => {
  res.send("Current user details");
});

module.exports = {
  currentUser,
  loginUser,
  registerUser,
};

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { constants } = require("../errorConstants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
    user: {
      userId: newUser.userId,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    },
  });
});
// not storing the token while registration, only during login
// because user might want to verify email first before logging in
// therefore in frontend after registration we can redirect user to login page

const loginUser = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body; // identifier can be either email or username
    if (!identifier || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Identifier and password are required");
  }
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Invalid credentials");
  }
  // generate JWT token
    const token = jwt.sign(
        { userId: user.userId, username: user.username, email: user.email }, // why not using email here? what if user logged in using email? Ans: we can use either email or username to identify user in payload. That means whether user logged in using email or username, we can always get username from DB using email and vice versa. So including both userId and username in payload for flexibility.
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
});

// private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

module.exports = {
  currentUser,
  loginUser,
  registerUser,
};

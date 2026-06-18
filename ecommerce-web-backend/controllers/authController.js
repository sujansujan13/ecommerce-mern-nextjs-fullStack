const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
  setRefreshCookie,
} = require("../utils/generateToken");

// This function is a user signup handler that:
// Takes user details from request
// Checks if email already exists
// Creates new user in database
// Generates access + refresh tokens
// Stores refresh token + sets cookie
// Returns user info + access token
// Handles errors properly
// In One-Line: “Check → Create → Tokenize → Store → Cookie → Respond”
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already existed" });
    }

    const user = await User.create({ name, email, phone, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store hashed refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// ─── Login ─────────────────────────────────────────────────────────────
// 👉 This function is a login system that:
// Takes email + password
// Finds user in database
// Verifies password
// Generates JWT tokens
// Stores refresh token in cookie
// Returns access token + user data
// Handles errors
// #ONE-LINE# -> “Find → Verify → Tokenize → Cookie → Respond”
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    // this comparePassword is from the model
    //doesn't import -> Because Mongoose does this internally:
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save the refresh token to DB on login just like registration
    user.refreshToken = refreshToken;
    // { validateBeforeSave: false } is an option you pass to the .save() method. It tells Mongoose: "Save this data to the database immediately, and skip checking my schema validation rules."
    await user.save({ validateBeforeSave: false });

    setRefreshCookie(res, refreshToken);

    res.json({
      sucess: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

// ----- Refresh Token -------
// This function is used to generate a new access token without asking the user to log in again.
// In simple -> “User is still logged in, so give them a new access token using refresh token.”
//
// 👉 This function:
// Reads refresh token from cookie
// Verifies it using JWT secret
// Finds user in database
// Confirms token matches stored token
// Generates new access token
// Sends it back
// #ONE-LINE# -> “Cookie → Verify → Match → Reissue Access Token”
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No Refresh Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid refreshToken" });
    }

    const newAccessToken = generateAccessToken(user._id);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    // Clear cookie if the token is completely expired/malformed to force user login
    res.clearCookie("refreshToken");
    res.status(500).json({ success: false, message: "Refresh Token Failed" });
  }
};

// ---------- logout ------------
// 👉 This function:
// Reads refresh token from cookie
// Verifies user from token
// Removes refresh token from database
// Clears cookie from browser
// Logs user out
// #ONE-LINE#->“Verify → Delete token → Clear cookie → Logout”
exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch {
    res.clearCookie("refreshToken");
    res.json({ message: "logged out" });
  }
};

// --------- get current user -------
// “Returns the currently authenticated user using data already attached to req.user by authentication middleware.”
// “req.user in → user profile out”

exports.getMe = (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      role: req.user.role,
    },
  });
};

// 🔁 Common flow in apps:
// User logs in → gets access + refresh token
// Access token expires
// App silently calls refresh API
// Gets new access token
// User never notices logout

// model-what
// controller-how/behaviour->for every user action, we have a controller function that defines the logic for that action. It interacts with the model to perform database operations and sends responses back to the client. Each function is designed to handle specific user actions like registration, login, token refresh, logout, and fetching current user details.
// route-where

// 🧠 What is BEST practice?
// 👉 Most modern systems use:
// ✔ Access Token:
// Stored in memory (frontend state)
// ✔ Refresh Token:
// Stored in HTTP-only cookie

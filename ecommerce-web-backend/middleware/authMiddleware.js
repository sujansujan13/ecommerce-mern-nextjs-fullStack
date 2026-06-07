// 1. Receive request
// 2. Check if token was sent
// 3. Extract token
// 4. Verify token
// 5. Get user from database
// 6. Attach user to req.user
// 7. Allow access
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "no token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User Not Found" });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

// use on admin-only routes
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(401).json({ message: "Admin Access Required" });
  }
  next();
};

module.exports = { protect, adminOnly };

// Bearer abc.xyz.123
// after .split(" ") -> ["Bearer", "abc.xyz.123"] and [1] gives abc.xyz.123

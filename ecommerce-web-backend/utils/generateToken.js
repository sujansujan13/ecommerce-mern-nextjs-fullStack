// 1. Make sure JWT secrets exist
// 2. Create Access Token -> jwt.sign and access-secret
// 3. Create Refresh Token -> jwt.sign and refresh-secret
// 4. Store Refresh Token in Cookie -> res.cookie -> htttpOnly, secure, sameSite, maxAge
const jwt = require("jsonwebtoken");

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error(
    "CRITICAL: JWT secrets are missing from environment variables.",
  );
}

const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

// It stores the refresh token inside a browser cookie.
const setRefreshCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", token, {
    httpOnly: true, // JavaScript in the browser cannot read this cookie.
    // Without HttpOnly -> * document.cookie -> could expose: refreshToken=abc123 to malicious scripts.
    secure: isProduction, // uses HTTPS
    sameSite: isProduction ? "strict" : "lax", // 'lax' prevents auth issues during local development
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  setRefreshCookie,
};

// Why do we need JWT?
// Because HTTP is stateless:
// 👉 Server does NOT remember users

// A CSRF attack tricks a logged-in user into performing an action they never intended.
// sameSite: "strict"
// "I will not send this cookie when the request originates from another website."

// credentials: "include",
// It means: // "Browser, include cookies with this request."

// A JWT has 3 parts
// HEADER.PAYLOAD.SIGNATURE
// “Header tells how, payload tells who, signature proves it’s real.”

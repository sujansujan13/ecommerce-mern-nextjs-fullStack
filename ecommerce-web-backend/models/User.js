const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    // sparse: true
    // 👉 “Create a unique index, but ONLY for documents where this field exists”
    // if phone: { type: String, unique: true }
    // Every document MUST have a unique phone number
    // 👉 Even empty/null values will conflict
    phone: { type: String, sparse: true },
    // “Do NOT return this field when querying the database by default.”
    // without select: false
    // if const user = await User.findOne({ email: "test@gmail.com" });
    // results {"_id": "123","email": "test@gmail.com","password": "hashedPassword123" }
    // ❌ Password is exposed (not safe)
    // When you actually need password
    // const user = await User.findOne({ email }).select("+password");
    password: { type: String, select: false },
    avatar: { type: String, default: "" },
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    providerId: { type: String },
    refreshToken: { type: String, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, select: false },
  },
  { timestamps: true },
);

// Hash password before saving
// pre("save") → runs before saving
// isModified → check if password changed
// bcrypt.hash → encrypt password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});
// In your UserSchema.pre("save", ...) function, you are using the older callback style where you manually call next(). However, since you've defined the function as async, Mongoose treats it as a Promise-based middleware. In modern Mongoose, if you use async, you should not include the next parameter or call it, as Mongoose waits for the Promise to resolve automatically.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

// select: false → hidden by default
// .select("+field") → show it when needed

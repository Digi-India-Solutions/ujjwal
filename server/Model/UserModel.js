
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, email: this.email,role:this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "20d",
    }
  );
  return token;
};

 const User = mongoose.model("User", userSchema);
 module.exports = User;

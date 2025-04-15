const User = require("../Model/UserModel.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SignUp = async (req, res) => {
  try {
    const { email, fullName, phone, password } = req.body || {};
    if (!email || !fullName || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, fullName, phone, password });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-up server error" });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const isUserExisted = await User.findOne({ email });
    if (!isUserExisted) {
      return res.status(400).json({ message: "User not found" });
    }
   
    if (isUserExisted.role !== "admin") {
      return res.status(400).json({ message: "User is not admin" });
    }

    const IsCorrectPassword = await bcrypt.compare(
      password,
      isUserExisted?.password
    );

    if (!IsCorrectPassword) {
      return res
        .status(400)
        .json({ message: "Authorized failed ! password is incorrect" });
    }

    const token = await isUserExisted.generateToken();

    return res.status(200).json({
      message: "Sign-in successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-in server error" });
  }
};

const sentResetPasswordMail = async (email, myToken, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "For Reset password",
      html: `
      <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #e6f4fb;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #0ea5e9;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333;
      }
      .content h2 {
        margin-top: 0;
      }
      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 25px;
        background-color: #0ea5e9;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        padding: 15px;
        font-size: 13px;
        color: #888;
        text-align: center;
        background-color: #f0f9ff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <h2>Hello,</h2>
        <p>We received a request to reset your password. Click the link below to set a new password:</p>
        <a href="${
          process.env.BASE_URL
        }/reset-password/${id}/${myToken}" >${
        process.env.BASE_URL
      }/login/reset-password/${myToken}</a>
        <p><strong>Note:</strong> This link will expire after a short time for your security.</p>
        <p style="color: red;"><strong>Do not share this email or link with anyone.</strong> If you didn’t request a password reset, please ignore this email or contact support.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Assorts Machine Tools. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found " });
    }
    if (user.role !== "admin") {
      return res.status(400).json({ message: "User is not admin" });
    }
    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
    await user.save();

    await sentResetPasswordMail(email, token, user._id);
    return res
      .status(200)
      .json({ message: "Reset password link sent successfully" });
  } catch (error) {
    console.log("forgot password error", error);
    res.status(500).json({ message: "forgot password server error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body || {};
    if (!id || !token || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or Your reset link is expired" });

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("reset password error", error);
    res.status(500).json({ message: "reset password server error" });
  }
};

const VerifyUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "admin")
      return res.status(400).json({ message: "User is not admin" });
    return res
      .status(200)
      .json({ message: "User verified successfully", success: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  VerifyUser,
};

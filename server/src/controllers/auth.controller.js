import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../services/mail.service.js";

export const registerUser = asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;
  const isUserExits = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (isUserExits) {
    throw new appError("Please Login", 400, "User already exists.");
  }
  const user = await userModel.create({
    username,
    email,
    hashPassword: password,
  });

  const verifyEmailToken = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity",
    html: `
             <p>Hi ${username},</p>
             <p>thank you for registering at <strong>Perplexity</strong>
             <p>verify your account using the link below</p>
             <a href="http://localhost:3000/api/auth/verify-email?token=${verifyEmailToken}">verify</a>
             <p>Happy to have you on board</p>
        `,
  });
  return res.status(201).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    message: "User registered successfully",
    success: true,
    status: "success",
  });
});

export const verifyEMail = asyncHandler(async function (req, res) {
  const { token } = req.query;
  if (!token) {
    throw new appError("Token not found or missing", 401, "Unauthorized");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new appError("Invalid or expired token", 401, "Unauthorized");
  }

  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new appError(
      "User not found",
      404,
      "No account exists with this email",
    );
  }

  if (user.verified) {
    return res.status(200).json({
      success: true,
      message: "Email is already verified.",
    });
  }

  user.verified = true;
  await user.save();

  res.status(200).send(
    ` <!DOCTYPE html>
    <html>
    <head><title>Verification Success</title></head>
    <body>
        <h1>Email Verified Successfully!</h1>
        <p>You can now close this window or log in to your account.</p>
    </body>
    </html>
        `,
  );
});

export const loginUser = asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ username: username }, { email: email }],
    })
    .select("+hashPassword");
  if (!user) {
    throw new appError("Invalid credentials", 401, "Unauthorized");
  }
  if (!user.verified) {
    throw new appError(
      "Please verify your email before login",
      403,
      "verification pending",
    );
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new appError("Invalid credentials ", 401, "Unauthorized");
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  return res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    message: "user logged In successfully...",
    success: true,
    status: "success",
  });
});

export const getMeUser = asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new appError("user not found", 404, "Invalid credentials");
  }

  return res.status(200).json({
    message: "User data fetched successfully",
    status: "success",
    success: true,
    user,
  });
});

import bcrypt from "bcryptjs";

import User from "../models/authModel.js";
import tokenCreation from "../utils/tokenCreation.js";


export async function signup(req, res) {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    // Validation
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Avatar URLs
    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create user
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyAvatar : girlAvatar,
    });

    await newUser.save();

    // Create token + set cookie
    tokenCreation(newUser._id, res);

    // ✅ Return full user data (so frontend can save it in localStorage)
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Signup error", error: error.message });
  }
}


export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // 1) Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    // 2) Check password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ success: false, message: "Incorrect password!" });
    }

    // 3) Create token + cookie (if your util sets cookie, still OK to return the token)
    const token = tokenCreation(user._id, res);

    // 4) Return user payload consistent with signup
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        gender: user.gender,
        email: user.email,              // include if you have it
        profilePicture: user.profilePicture, // 👈 important
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
}


export async function logout(req, res) {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfull" });
  } catch (error) {
    console.log("Error in logout");
    return res.status(400).json({ success: false, message: "Error in logout" });
  }
}

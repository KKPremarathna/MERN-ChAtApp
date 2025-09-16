import bcrypt from "bcryptjs";

import User from "../models/authModel.js";
import tokenCreation from "../utils/tokenCreation.js";

export async function signup(req, res) {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "username already exist" });
    }

    //HashPassword
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //avatars
    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyAvatar : girlAvatar,
    });

    //token creation
    tokenCreation(newUser._id, res);

    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "New user created successfully" });
  } catch (error) {
    console.log("Signup error", error);
    return res
      .status(500)
      .json({ success: false, message: "Signup error", error });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!!" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect!!" });
    }

    tokenCreation(user._id, res);

    return res
      .status(200)
      .json({ success: true, message: "Login successfully" });
  } catch (error) {
    console.log("Login Error", error);
    return res.status(400).json({ success: false, message: "Login Error" });
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

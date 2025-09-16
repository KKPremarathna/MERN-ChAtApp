import jwt from "jsonwebtoken";
import User from "../models/authModel.js";

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized- No token provided" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized- Invalid token" });
    }

    const user = await User.findById(tokenDecode.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("authentication error", error);
    return res
      .status(400)
      .json({ success: false, message: "authentication error" });
  }
};

export default authentication;

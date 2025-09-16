import jwt from "jsonwebtoken";

const tokenCreation = (userId,res)=>{
    // Generate JWT token
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"})

    // Set cookie to send the token to the browser securely.
    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none":"strict",
        maxAge:7 * 24 * 60 * 60 * 1000,
    })
}

export default tokenCreation

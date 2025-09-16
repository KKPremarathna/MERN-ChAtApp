import mongoose from "mongoose";

const db = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database Connection Error",error)
    }
}

export default db;
import User from "../models/authModel.js";

export async function getUsersForSidebar(req,res){
    try {
        const loggedInUser = req.user._id;

        //find other users without the logged in one without password
        const otherUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password")

        return res.status(200).json({success:true,message:"users are got finely",data:otherUsers})

    } catch (error) {
        console.log("GetUsersForSidebar error",error)
        return res.status(500).json({success:false,message:"GetUsersForSidebar error"})
    }
}
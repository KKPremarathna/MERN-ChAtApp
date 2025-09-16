import { populate } from "dotenv";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    //check if there any existing conversation between them
    let conversation = await Conversation.findOne({
      participants: [senderId, recieverId],
    });

    //if no conversation create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage.id);
    }

    //PARELLELY SAVE BOTH
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("sendMessage error", error);
    return res
      .status(400)
      .json({ success: false, message: "sendMessage Error" });
  }
}

export async function getMessage(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // oldest → newest

    if (!messages.length) {
      return res.status(200).json({ success: true, message: "No Messages" });
    }

    return res.status(200).json({
      success: true,
      message: "Get message Done",
      data: messages,
    });
  } catch (error) {
    console.log("getMessage error", error);
    return res.status(400).json({ success: false, message: "getMessage Error" });
  }
}


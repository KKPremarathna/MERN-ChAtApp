// hooks/useListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import UserConversations from "../storezustand/userConversation";
import notificationSound from "../assets/sound/notificastionSound.mp3"

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = UserConversations();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
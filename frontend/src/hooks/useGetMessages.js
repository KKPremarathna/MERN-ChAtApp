import { useEffect, useState } from "react";
import userConversation from "../storezustand/userConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = userConversation();

  useEffect(() => {
    if (!selectedConversation?._id) return;

    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        console.log("API raw:", data);

        if (!res.ok) throw new Error(data.message || "Failed to get messages");

        const list = Array.isArray(data) ? data : data.data ?? [];
        setMessages(list);
        
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;

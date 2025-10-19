import React, { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/messageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  // ✅ normalize here too (belt & suspenders)
  const items = Array.isArray(messages)
    ? messages
    : Array.isArray(messages?.data)
    ? messages.data
    : [];

  return (
    <div className="px-4 flex-1 overflow-auto space-y-3">
      {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && items.length === 0 && (
        <p className="text-center text-sm text-cyan-200">Start a conversation</p>
      )}

      {!loading &&
        items.length > 0 &&
        items.map((m) => (
          <Message key={m._id || `${m.senderId}-${m.createdAt}`} message={m} />
        ))}

      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;

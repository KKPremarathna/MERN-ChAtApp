import React from "react";
import Conversation from "./Conversation";
import useUserConversations from "../../hooks/useUserConversations";

const Conversations = () => {
  const { loading, conversations } = useUserConversations();
  console.log("Conversations:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {Array.isArray(conversations) &&
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id || idx}
            conversation={conversation}  
            lastIdx={idx === conversations.length - 1}
          />
        ))}

      {!loading && conversations?.length === 0 && (
        <p className="text-center text-sm opacity-70 py-4">
          No conversations yet.
        </p>
      )}

      {loading && <span className="loading loading-spinner mx-auto" />}
    </div>
  );
};

export default Conversations;

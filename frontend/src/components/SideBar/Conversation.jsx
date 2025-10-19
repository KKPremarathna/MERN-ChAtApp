import React from "react";
import userConversation from "../../storezustand/userConversation";
import { useSocketContext } from "../../context/socketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = userConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)

  const name = conversation?.fullname;

  const avatar = conversation?.profilePicture;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer transition ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar  ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <span className="text-sm">{name?.[0]?.toUpperCase() || "?"}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-xl text-gray-200">{name}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;

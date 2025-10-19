import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import userConversation from "../../storezustand/userConversation";
import { useAuthContext } from "../../context/authContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = userConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-1 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold text-lg">
              {" "}
              {selectedConversation.fullname}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-2xl font-semibold">
            👋 Welcome back,{" "}
            <span className="text-blue-500">{authUser.fullname}</span>!
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Select a chat to start messaging 💬
          </p>
        </div>

        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

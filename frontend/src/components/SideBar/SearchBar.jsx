import React, { useState } from "react";
import { LuUserRoundSearch } from "react-icons/lu";
import useUserConversation from "../../hooks/useUserConversations";
import userConversation from "../../storezustand/userConversation";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [search, setSearch] = useState(""); 
  const { setSelectedConversation } = userConversation();
  const { conversations } = useUserConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return toast.error("Please enter a search term");
    }

    if (search.length < 3) {
      return toast.error("Search term must be more than 2 characters");
      
    }

    const conversation = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="h-10 input input-bordered input-info w-full max-w-xs bg-opacity-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-blue-600 text-white outline-none"
      >
        <LuUserRoundSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchBar;

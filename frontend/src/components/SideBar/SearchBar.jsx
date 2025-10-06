import React from "react";
import { LuUserRoundSearch } from "react-icons/lu";

const SearchBar = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="h-10 input input-bordered input-info w-full max-w-xs bg-opacity-80"
      />
      <button type="submit" className="btn btn-circle bg-blue-600 text-white outline-none">
        <LuUserRoundSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchBar;

"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.MouseEvent) => {
    console.log(e);
  };
  return (
    <div className="flex rounded-lg bg-white text-gray-500 justify-between pr-5 shadow-none transition hover:shadow">
      <input
        className="pt-5 pb-5 pl-5 focus:outline-none"
        name="search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search..."
      />
      <MagnifyingGlassIcon
        className="w-6 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;

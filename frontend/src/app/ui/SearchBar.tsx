"use client";

import { ChangeEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { search } from "@/lib/functions";
import SearchResults from "./SearchResults";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    isLoading: false,
    projects: [],
    tasks: [],
    teams: [],
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    const resultsResponse = await search(query);
    setResults({ isLoading: false, ...resultsResponse.result });
  };

  return (
    <div className="relative flex flex-1 rounded-lg bg-white text-gray-500 justify-between pr-5 shadow-none transition hover:shadow">
      <input
        type="text"
        className="pt-5 pb-5 pl-5 focus:outline-none flex-1"
        name="search"
        onChange={handleChange}
        autoComplete="false"
        value={query}
        placeholder="Search..."
      />

      <SearchResults results={results} />
    </div>
  );
}

export default SearchBar;

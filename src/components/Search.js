import React, { useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import SearchResult from "./SearchResult";
import { searchSymbols } from "../api/stock-api";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatch, setBestMatch] = useState([]);

  const clear = () => {
    setInput("");
    setBestMatch([]);
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbols(input);
        const result = searchResults.result;
        setBestMatch(result);
      }
    } catch (error) {
      setBestMatch([]);
      throw new Error(error);
    }
  };

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96">
      <input
        className="w-full px-4 py-2 focus:outline-none rounded-md"
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear}>
          <XIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
      >
        <SearchIcon className="h-4 w-4 fill-gray-100" />
      </button>
      {input && bestMatch.length > 0 ? (
        <SearchResult results={bestMatch} />
      ) : null}
    </div>
  );
};

export default Search;

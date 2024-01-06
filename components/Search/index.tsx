import React from "react";

export default function Search() {
  return (
    <div className="py-10 px-10">
      <label
        htmlFor="search-by-title"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Search by title:
      </label>
      <input
        type="text"
        name="search-by-title"
        id="search-by-title"
        className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

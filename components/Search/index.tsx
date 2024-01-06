import { SearchProp } from "@/types";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Search({
  searchName,
  setSearchName,
  handleBtnClick,
}: SearchProp) {
  const navigate = useRouter()
  return (
    <div className="py-10 px-10">
      <label
        htmlFor="searchName"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Search by title:
      </label>
      <div className="flex">
        <input
          type="text"
          name="searchName"
          id="searchName"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          disabled={!searchName.trim()}
          onClick={() => handleBtnClick()}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <BsSearch />
          <span className="sr-only">Search</span>
        </button>
        <button
          type="submit"
          onClick={()=> navigate.push('/bookmarks')}
          className="p-2.5 ms-2 text-sm font-medium text-black bg-white-700 rounded-lg border border-black-700  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          All Bookmark
        </button>
      </div>
    </div>
  );
}

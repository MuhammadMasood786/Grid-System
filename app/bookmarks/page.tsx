"use client";
import { Data } from "@/types";
import React, { useEffect, useState } from "react";

export default function Bookmarks() {
  const [bookMarks, setBookMarks] = useState<Data[]>([]);

  useEffect(() => {
    // Load bookmarks from local storage
    const storedBookmarks = localStorage.getItem("bookmarks");
    setBookMarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
  }, []);

  if (bookMarks.length == 0) {
    return (
      <h3 className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        {" "}
        No Bookmark added!
      </h3>
    );
  }

  return (
    <div>
      <h1 className="px-6 py-4 text-2xl font-bold">Bookmarked Posts</h1>
      <ul>
        {bookMarks.map((bookmark) => (
          <li key={bookmark.id}>
            <h2 className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white ">
              <span className=" mx-auto w-80 font-bold">Title: </span> {bookmark.title}
            </h2>
            <p className="px-6"><span className="font-bold">Body: </span> {bookmark.body}</p>
            <hr className="mt-3 mx-auto w-80"/>
          </li>
        ))}
      </ul>
    </div>
  );
}

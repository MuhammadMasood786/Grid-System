"use client";

import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import { transformData } from "@/service/service";
import { Data } from "@/types";

import { useEffect, useState } from "react";

export default function Pages() {
  // Table state
  const [data, setData] = useState<Data[]>([]);
  const [copyData, setCopyData] = useState<Data[]>([]);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  // Search state
  const [searchName, setSearchName] = useState<string>("");

  //Bookmarks state
  const [addBookMarks, setBookMarks] = useState<Data[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages.length) setCurrentPage(currentPage + 1);
  };

  const pageCreated = (dataLength: number) => {
    const pagesCount = Math.ceil(dataLength / postsPerPage);
    let pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);
    setTotalPages(pages);
  };

  const handleBtnClick = () => {
    if (!searchName.trim()) return;
    const searchData = [
      ...copyData.filter(
        (item: Data) => item.title.toLowerCase().indexOf(searchName) != -1
      ),
    ];
    if (searchData.length == 0) return;
    setData(searchData);
  };

  const handleBookmarkToggle = (postId: number) => {
    const updatedBookmarks = [...addBookMarks];
    const existingIndex = updatedBookmarks.findIndex(
      (bookmark) => bookmark.id === postId
    );

    if (existingIndex !== -1) {
      // Remove bookmark if it already exists
      updatedBookmarks.splice(existingIndex, 1);
    } else {
      // Add bookmark if it doesn't exist
      const postToAdd = copyData.find((post) => post.id === postId);
      updatedBookmarks.push(postToAdd);
    }
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setBookMarks(updatedBookmarks);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const storedBookmarks = localStorage != undefined && JSON.parse(localStorage.getItem("bookmarks")) as Data[] ;
      setBookMarks(storedBookmarks)
      setCopyData(result);
      pageCreated(result.length);
      const paginateData = transformData(result, 1, 10, storedBookmarks);
      setData(paginateData);
    })();
  }, []);

  useEffect(() => {
    const paginateData = transformData(
      copyData,
      startIndex,
      endIndex,
      addBookMarks
    );
    setData(paginateData);
  }, [currentPage, addBookMarks]);


  

  return (
    <>
      <Search
        searchName={searchName}
        setSearchName={setSearchName}
        handleBtnClick={handleBtnClick}
      />
      <Table data={data} handleBookmarkToggle={handleBookmarkToggle} />
      <Pagination
        pages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        items={copyData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </>
  );
}

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

  // Search
  const [searchName, setSearchName] = useState<string>("");

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

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setCopyData(result);
      pageCreated(result.length);
      const paginateData = transformData(result);
      setData(paginateData);
    })();
  }, []);

  useEffect(() => {
    const paginateData = transformData(copyData, startIndex, endIndex);
    setData(paginateData);
  }, [currentPage]);

  return (
    <>
      <Search
        searchName={searchName}
        setSearchName={setSearchName}
        handleBtnClick={handleBtnClick}
      />
      <Table data={data} />
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

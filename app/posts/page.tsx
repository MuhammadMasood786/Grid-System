"use client";

import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import { transformData } from "@/service/service";
import { Data } from "@/types";

import {  useEffect, useState } from "react";

export default function Pages() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Data[]>([]);
  const [copyData, setCopyData] = useState<Data[]>([]);
  //Page
  const postsPerPage = 10;
  const pagesCount = Math.ceil(copyData.length / postsPerPage);
  const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

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
      const paginateData = transformData(result);
      setData(paginateData);
    })();
  }, []);

  useEffect(() => {
    const paginateData = transformData(copyData, startIndex, endIndex);
    setData(paginateData);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Search />
      <Table data={data} />
      <Pagination
        pages={pages}
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

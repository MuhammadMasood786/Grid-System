import { PaginationProps } from "@/types";
import React from "react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function Pagination({
  items,
  pages,
  currentPage,
  endIndex,
  startIndex,
  setCurrentPage,
  handleNextPage,
  handlePreviousPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex}</span> to{" "}
            <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{items}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={() => handlePreviousPage()}
              className={`relative  inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage == 1 ? "disabled" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <FaAngleLeft className="h-5 w-5" />
            </a>
            {pages.map((page) => (
              <a
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  page == currentPage ? "bg-indigo-600" : ""
                }  px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {page}
              </a>
            ))}

            <a
              onClick={() => handleNextPage()}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <FaAngleRight className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

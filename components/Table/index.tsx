import { Data } from "@/types";
import Link from "next/link";
import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function Table({
  data,
  handleBookmarkToggle,
}: {
  data: Data[];
  handleBookmarkToggle: (arg: number) => void;
}) {
  return (
    <div className="px-10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Body
              </th>
              <th scope="col" className="px-6 py-3">
                Bookmark
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: Data) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id}
              >
                <th
                  scope="row"
                  className=" underline px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                >
                  <Link href={`/posts/${item.id}`}>{item.id}</Link>
                </th>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.body}</td>

                <td className="px-6 py-4">
                  {
                    <button
                      type="submit"
                      onClick={() => handleBookmarkToggle(item.id)}
                      className="p-2.5 ms-2 text-sm font-medium text-black bg-white-700 rounded-lg border border-black-700  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {item.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import { Data } from "@/types";
import React, { useEffect, useState } from "react";

export default function PostDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const [data, setData] = useState<Data>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    })();
  }, []);
  return (
    <div>
      <h1 className="px-6 py-4 text-2xl font-bold">Post by ID</h1>
      <ul>
        <li>
          <h2 className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white ">
            <span className=" mx-auto w-80 font-bold">Title: </span>{" "}
            {data.title}
          </h2>
          <p className="px-6">
            <span className="font-bold">Body: </span> {data.body}
          </p>
          <hr className="mt-3 mx-auto w-80" />
        </li>
      </ul>
    </div>
  );
}

// export async function getServerSideProps(context)  {
//   const { params } = context;
//   const { id } = params;

//   // Fetch data from an API using post id
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   const post = await response.json();

//   // Pass data to the component
//   return {
//     props: {
//       post,
//     },
//   };
// }

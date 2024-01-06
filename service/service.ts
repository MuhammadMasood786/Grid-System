import { Data } from "@/types";

export const transformData = (
  data: Data[],
  startIndex: number = 1,
  endIndex: number = 10
) => {
  const paginationData:Data[] = data.slice(startIndex, endIndex).map((post: Data) => ({
    ...post,
    body: post.body.length <= 40 ? post.body : post.body.substring(0, 40),
    title: post.title.length <= 40 ? post.title : post.title.substring(0, 40),
    
  }));

  return  paginationData;
};

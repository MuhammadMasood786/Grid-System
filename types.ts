import { Dispatch, SetStateAction } from "react";

export interface PaginationProps {
  items:number
  currentPage:number
  startIndex:number
  endIndex:number
  pages: number[]
  setCurrentPage:Dispatch<SetStateAction<number>>
  handlePreviousPage:()=>void
  handleNextPage:()=>void
}

export interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}






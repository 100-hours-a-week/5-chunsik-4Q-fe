import { Item } from "@/types/item";

export interface GalleryPage {
  content: Item[];
  page: number;
  number: number;
  last: boolean;
  totalPages: number;
  totalElements: number;
}

export interface ContainerProps {
  category: string;
  tag: string;
  sort: string;
}

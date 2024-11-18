import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./item-container.module.css";
import ItemCard from "./item-card";
import { getGalleryData } from "@/service/photo_api";
import { Button } from "antd";
import { BounceDot } from "basic-loading";
import { Item } from "@/types/item";

type GalleryPage = {
  content: Item[];
  page: number;
  number: number;
  last: boolean;
  totalPages: number;
  totalElements: number;
};

type ContainerProps = {
  category: string;
  tag: string;
  sort: string;
};

export default function Container({ category, tag, sort }: ContainerProps) {
  const loadingOption = {
    size: 12,
    color: "#FE5B10",
  };
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GalleryPage>({
    queryKey: ["galleryData", category, tag, sort],
    queryFn: ({ pageParam = 0 }) =>
      getGalleryData({ pageParam, category, tag, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.last) {
        console.log(lastPage);
        return lastPage.number + 1;
      }
      return undefined;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (isLoading) {
    return (
      <div style={{ marginTop: "50px" }}>
        <BounceDot option={loadingOption} />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading gallery data.</div>;
  }

  const items = data?.pages.flatMap((page) => page.content) || [];

  return (
    <div className={styles.container}>
      {items.map((item: Item) => (
        <ItemCard key={item.imageId} item={item} />
      ))}
      {hasNextPage && (
        <div className={styles.moreBtnContainer}>
          <Button
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            className={styles.moreBtn}
          >
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}

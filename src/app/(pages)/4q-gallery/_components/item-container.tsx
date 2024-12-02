import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./item-container.module.css";
import ItemCard from "./item-card";
import { getGalleryData } from "@/service/photo_api";
import { BounceDot } from "basic-loading";
import { Item } from "@/types/item";
import { GalleryPage, ContainerProps } from "@/types/gallery";
import { useInView } from "react-intersection-observer";
import { message } from "antd";

export default function Container({ category, tag, sort }: ContainerProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "더 이상 불러올 데이터가 없습니다.",
      duration: 1.2,
      style: {
        marginTop: "40px",
      },
    });
  };

  const { ref, inView } = useInView({
    threshold: 1, 
    triggerOnce: false, 
    onChange: (inView) => {
      if (inView && !hasNextPage) {
        warning(); 
      }
    },
  });

  const loadingOption = {
    size: 10,
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
        return lastPage.number + 1;
      }
      return undefined;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
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
      {contextHolder}
      {items.map((item: Item) => (
        <ItemCard key={item.imageId} item={item} />
      ))}
      {hasNextPage && (
        <div ref={ref} className={styles.loadingContainer}>
          {isFetchingNextPage ? (
            <BounceDot option={loadingOption} />
          ) : (
            <span></span>
          )}
        </div>
      )}
      {!hasNextPage && (
        <div className={styles.emptyContainer} ref={ref}>
          
        </div>
      )}
    </div>
  );
}

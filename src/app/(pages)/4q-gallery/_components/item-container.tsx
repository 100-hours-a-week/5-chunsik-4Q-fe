import { useEffect, useState } from "react";
import styles from "./item-container.module.css";
import ItemCard from "./item-card";
import { getGalleryData } from "../../../../service/photo_api";
import { Button } from "antd";
import { BounceDot } from "basic-loading";

type Item = {
  createdAt: string;
  imageId: number;
  likeCount: number;
  userName: string;
  categoryName: string;
  url: string;
  tags: string[];
  liked: boolean;
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

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getGalleryData(page, category, tag, sort);
        setItems((prevItems) =>
          page === 0 ? data.content : [...prevItems, ...data.content]
        ); // Reset items if page is 0, otherwise append
        setHasMore(!data.last);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, category, tag, sort]);

  useEffect(() => {
    // Reset page to 0 whenever filters change
    setPage(0);
  }, [category, tag, sort]);

  if (loading && items.length === 0) {
    return <BounceDot option={loadingOption} />;
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ItemCard key={item.imageId} item={item} />
      ))}
      {hasMore && (
        <div className={styles.moreBtnContainer}>
          <Button
            onClick={loadMore}
            loading={loading}
            className={styles.moreBtn}
          >
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import styles from './item-container.module.css';
import ItemCard from './item-card';
import { getGalleryData } from '../../../../service/photo_api';
import { Button } from "antd";

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
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getGalleryData(page, category, tag, sort);
        setItems(prevItems => (page === 0 ? data.content : [...prevItems, ...data.content])); // Reset items if page is 0, otherwise append
        setHasMore(!data.last);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
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
    return <div>Loading...</div>;
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ItemCard key={item.imageId} item={item} />
      ))}
      {hasMore && (
        <div className={styles.moreBtnContainer}>
          <Button onClick={loadMore} loading={loading} className={styles.moreBtn}>
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}

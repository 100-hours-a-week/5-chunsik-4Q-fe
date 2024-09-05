import { useEffect, useState } from 'react';
import styles from './item-container.module.css';
import ItemCard from './item-card';
import { getGalleryData } from '../../../../service/photo_api';
import { Button, Pagination } from "antd"
import type { PaginationProps } from 'antd';

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
        const data = await getGalleryData(page, category, tag, sort); // Pass parameters here
        setItems(data.content);
        setHasMore(!data.last);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, category, tag, sort]); // Add category, tag, and sort as dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadNext = () => {
    setPage(prevPage => prevPage + 1);
  }

  const loadPrev = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  }

  return (
      <div className={styles.container}>
        {items.map((item) => (
          <ItemCard key={item.imageId} item={item} />
        ))}
      </div>
  );
}

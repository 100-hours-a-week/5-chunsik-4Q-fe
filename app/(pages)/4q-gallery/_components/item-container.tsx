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
  liked: boolean;  // Added 'liked' property
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
  const [page, setPage] = useState<number>(0);  // Page state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getGalleryData(page);
        setItems((prevItems) => [...prevItems, ...data.content]);  // Append new data
        setHasMore(!data.last);  // If `data.last` is true, set `hasMore` to false
        console.log(data.last);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);  // Dependency array includes `page` to refetch data on page change

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);  // Increment page number
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = category === 'all' || item.categoryName === category;
    const matchesTag = !tag || item.tags.includes(tag);
    return matchesCategory && matchesTag;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'popular') {
      return b.likeCount - a.likeCount;
    }
    return 0;
  });

  if (loading && page === 0) {  // Show loading only for the first page
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        {sortedItems.map((item) => (
          <ItemCard key={item.imageId} item={item} />
        ))}
      </div>
      {!loading && hasMore && (  // Show button only if not loading and there are more pages
        <div className={styles.moreBtnContainer}>
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: 'lightGrey' }}
            size='large'
            onClick={loadMore}  // Load more data on click
          >
            더보기
          </Button>
        </div>
      )}
    </>
  );
}

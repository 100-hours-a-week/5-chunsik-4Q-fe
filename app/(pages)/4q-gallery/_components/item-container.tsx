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
  const [page, setPage] = useState<number>(0);  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getGalleryData(page);
        setItems(data.content);
        setHasMore(!data.last);
        // console.log(hasMore);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadNext = () => {
    setPage(page+1);
  }

  const loadPrev = () => {
    setPage(page-1);
  }

  return (
    <>
    <div className={styles.container}>
      {sortedItems.map((item) => (
        <ItemCard key={item.imageId} item={item} />
      ))}
      
    </div>
    <div className={styles.moreBtnContainer}>
    {!hasMore && (<Button type="primary" shape="round" style={{backgroundColor: 'lightGrey'}} size='large' onClick={loadPrev}>
            이전
          </Button>)}
    {hasMore && (<Button type="primary" shape="round" style={{backgroundColor: 'lightGrey'}} size='large' onClick={loadNext}>
            다음
          </Button>)}
    </div>
    </>
  );
}

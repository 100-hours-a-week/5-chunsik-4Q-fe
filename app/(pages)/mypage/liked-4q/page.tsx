"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { List, message } from 'antd';  // Correct import for 'message'
import ItemList from './_components/item-list';
import { getLikedTicket, likeImage, unlikeImage } from '../../../../service/photo_api';

// Define the Ticket type
type Ticket = {
  imageId: number;
  title: string;
  url: string;
  categoryName: string;
  createdAt: string;
  liked: boolean;
  likeCount: number;
};

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);  // Correctly typed state

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getLikedTicket();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Handle like/unlike functionality in the parent component
  const toggleLike = async (imageId: number, isLiked: boolean) => {  // Type parameters
    const accessToken = localStorage.getItem('AccessToken');

    if (!accessToken) {
      message.error("로그인이 필요한 기능입니다.");
      return;
    }

    try {
      if (isLiked) {
        const response = await unlikeImage(imageId.toString());
        if (response) {
          setTickets((prevTickets) =>
            prevTickets.map((ticket) =>
              ticket.imageId === imageId
                ? { ...ticket, liked: false, likeCount: ticket.likeCount - 1 }
                : ticket
            )
          );
        }
      } else {
        const response = await likeImage(imageId.toString());
        if (response) {
          setTickets((prevTickets) =>
            prevTickets.map((ticket) =>
              ticket.imageId === imageId
                ? { ...ticket, liked: true, likeCount: ticket.likeCount + 1 }
                : ticket
            )
          );
        }
      }
    } catch (error) {
      console.error("Failed to toggle like status:", error);
    }
  };

  return (
    <div className={styles.container}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          position: 'bottom',
          align: 'center',
          style: { textAlign: 'center' },
        }}
        dataSource={tickets}
        renderItem={(item) => (
          <ItemList item={item} onToggleLike={toggleLike} />  // Pass the function down to the child
        )}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { List, message } from 'antd';
import ItemList from './_components/item-list';
import { getLikedTicket, likeImage, unlikeImage } from '../../../../service/photo_api';

// Extend Ticket type to include additional properties
type ExtendedTicket = {
  imageId: number;
  title: string;
  url: string;
  categoryName: string;
  createdAt: string;
  liked: boolean;
  likeCount: number;
  userName: string;  // Add missing properties
  tags: string[];    // Add missing properties
};

export default function Page() {
  const [tickets, setTickets] = useState<ExtendedTicket[]>([]);  // Correctly typed state

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data: ExtendedTicket[] = await getLikedTicket();  // Ensure data is correctly typed
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

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
        dataSource={tickets}
        renderItem={(item) => (
          <ItemList item={item} onToggleLike={toggleLike} />  // Pass the function down to the child
        )}
      />
    </div>
  );
}

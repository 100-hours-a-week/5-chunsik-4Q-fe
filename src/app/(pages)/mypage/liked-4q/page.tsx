"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { List, message } from "antd";
import ItemList from "./_components/item-list";
import {
  getLikedTicket,
  likeImage,
  unlikeImage,
} from "@/service/photo_api";
import { Item } from "@/types/item";

interface ExtendedTicket extends Item {
  title: string;
};

export default function Page() {
  const [tickets, setTickets] = useState<ExtendedTicket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data: ExtendedTicket[] = await getLikedTicket();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const toggleLike = async (imageId: number, isLiked: boolean) => {
    const accessToken = sessionStorage.getItem("AccessToken");

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
          <ItemList item={item} onToggleLike={toggleLike} />
        )}
      />
    </div>
  );
}

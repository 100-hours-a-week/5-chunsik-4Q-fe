"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { List } from "antd";
import ItemList from "./_components/item-list";
import { getMyTicket } from "../../../../service/photo_api";

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getMyTicket();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = (id) => {
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  return (
    <div className={styles.container}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={tickets}
        renderItem={(item) => <ItemList item={item} onDelete={handleDelete} />}
      />
    </div>
  );
}

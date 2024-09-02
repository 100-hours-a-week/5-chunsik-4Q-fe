"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { List } from 'antd';
import ItemList from './_components/item-list'; 
import { getMyTicket } from '../../../../service/photo_api';

// Page Component
export default function Page() {
  // State to store ticket data
  const [tickets, setTickets] = useState([]);

  // Fetch tickets when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getMyTicket(); // Call the API to fetch ticket data
        setTickets(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets(); // Invoke the async function to fetch data
  }, []);

  return (
    <div className={styles.container}>
      {/* Ant Design List Component */}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          position: 'bottom', 
          style: { textAlign: 'center' }, 
        }}
        dataSource={tickets} // Use the fetched data as dataSource
        renderItem={(item) => <ItemList item={item} />} // Use the new ListItem component
      />
    </div>
  );
}

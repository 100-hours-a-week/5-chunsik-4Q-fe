"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { List } from 'antd';
import ItemList from './_components/item-list'; 
import { getMyTicket } from '../../../../service/photo_api';


export default function Page() {
  const [tickets, setTickets] = useState([]);


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getMyTicket(); 
        // console.log(data);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets(); 
  }, []);

  return (
    <div className={styles.container}>
      <List
        itemLayout="vertical"
        size="large"
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: 3,
        //   position: 'bottom', 
        //   align: 'center',
        //   style: { textAlign: 'center' }, 
        // }}
        dataSource={tickets} 
        renderItem={(item) => <ItemList item={item} />} 
      />
    </div>
  );
}

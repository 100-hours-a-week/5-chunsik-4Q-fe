"use client"

import React from 'react';
import styles from './page.module.css';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import ItemList from './_components/item-list'; // Import the new ListItem component

// List Data
const data = Array.from({ length: 6 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  createdAt: "2024/01/01",
  category: "메뉴판"
}));

export default function Page() {
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
        dataSource={data}
        renderItem={(item) => <ItemList item={item} />} // Use the new ListItem component
      />
    </div>
  );
}

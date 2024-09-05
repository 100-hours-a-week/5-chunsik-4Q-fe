import React, { useState } from "react";
import styles from './item-list.module.css';
import { List, Button, Tag, message } from 'antd';
import { IoIosCalendar } from "react-icons/io";
import Heart from "@react-sandbox/heart";
import { likeImage, unlikeImage } from "../../../../../service/photo_api";

type Item = {
  imageId: number;
  title: string;
  url: string;
  categoryName: string;
  createdAt: string;
  liked: boolean;
  likeCount: number;
};

type ItemListProps = {
  item: Item;
};

const ItemList = ({ item }: ItemListProps) => {
  const [active, setActive] = useState(item.liked); // State for like status
  const [likeCount, setLikeCount] = useState(item.likeCount); // State for like count

  // Handle like/unlike functionality
  const clickHeart = async () => {
    const accessToken = localStorage.getItem('AccessToken');
    
    if (!accessToken) {
      message.error("로그인이 필요한 기능입니다.");
      return; 
    }

    try {
      if (active) {
        const response = await unlikeImage(item.imageId.toString());
        if (response) {
          setActive(false);
          setLikeCount(likeCount - 1); 
        }
      } else {
        const response = await likeImage(item.imageId.toString());
        if (response) {
          setActive(true);
          setLikeCount(likeCount + 1); 
        }
      }
    } catch (error) {
      console.error("Failed to toggle like status:", error);
    }
  };

  return (
    <List.Item key={item.title}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.imgContainer}>
            <img
              width={150}
              height={150}
              alt="my 4q tickets"
              src={item.url}
              style={{ backgroundColor: 'grey' }}
            />
          </div>
          <span className={styles.title}>{item.title}</span>
        </div>
        <div className={styles.infoConatiner}>
          <div className={styles.categoryGroup}>
            <Tag>{item.categoryName}</Tag>
          </div>
          <div className={styles.dateGroup}>
            <IoIosCalendar />
            <span>{item.createdAt}</span>
          </div>
          <div className={styles.likeBtnContainer}>
            <div className={styles.likeBtn}>
            <Heart
              width={25}
              height={25}
              active={active}
              onClick={clickHeart} 
            />
            </div>
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export default ItemList;

import React from "react";
import styles from './item-list.module.css';
import { List, Tag } from 'antd';
import { IoIosCalendar } from "react-icons/io";
import Heart from "@react-sandbox/heart";

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
  onToggleLike: (imageId: number, isLiked: boolean) => void;  // Function prop
};

const ItemList = ({ item, onToggleLike }: ItemListProps) => {

  const clickHeart = () => {
    onToggleLike(item.imageId, item.liked);
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
                active={item.liked}  // Use item.liked directly from props
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

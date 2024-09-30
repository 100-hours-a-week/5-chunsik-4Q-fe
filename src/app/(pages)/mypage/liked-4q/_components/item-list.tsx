import React, { useState } from "react";
import styles from "./item-list.module.css";
import { List, Tag, Button, Drawer } from "antd";
import { IoIosCalendar } from "react-icons/io";
import Heart from "@react-sandbox/heart";
import Detail from "../../../4q-gallery/_components/detail";

type Item = {
  imageId: number;
  title: string;
  url: string;
  categoryName: string;
  createdAt: string;
  liked: boolean;
  likeCount: number;
  userName: string;
  tags: string[];
};

type ItemListProps = {
  item: Item;
  onToggleLike: (imageId: number, isLiked: boolean) => void;
};

const ItemList = ({ item, onToggleLike }: ItemListProps) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const clickHeart = () => {
    onToggleLike(item.imageId, item.liked);
  };

  const onClose = () => {
    setOpen(false);
    sessionStorage.setItem("createStep", "false");
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
              style={{ backgroundColor: "grey" }}
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
          <Button
            className={styles.generateBtn}
            onClick={showDrawer}
            size="small"
          >
            4Q 생성하기
          </Button>
          <div className={styles.likeBtnContainer}>
            <div className={styles.likeBtn}>
              <Heart
                width={25}
                height={25}
                active={item.liked}
                onClick={clickHeart}
              />
            </div>
          </div>
        </div>
        <Drawer
          title="4Q 생성하기"
          placement="bottom"
          closable={true}
          onClose={onClose}
          open={open}
          height="97%"
          getContainer={document.body}
          className={styles.drawerContainer}
        >
          <div className={styles.detailContainer}>
            <Detail item={item} />
          </div>
        </Drawer>
      </div>
    </List.Item>
  );
};

export default ItemList;

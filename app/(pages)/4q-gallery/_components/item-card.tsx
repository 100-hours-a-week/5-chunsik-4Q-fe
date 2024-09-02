"use client";

import React, { useState } from "react";
import styles from "./item-card.module.css";
import mockup from "../../../../public/images/mock/concert.png";
import Heart from "@react-sandbox/heart";
import Detail from './detail';
import { Drawer, theme } from "antd";
import { IoMdHeart } from "react-icons/io";

type Item = {
  imageId: number;
  userName: string;
  url: string;
  likeCount: number;
  tags: string[];
  categoryName: string;
  createdAt: string;
};

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    sessionStorage.setItem('createStep', 'false');
  };

  const containerStyle: React.CSSProperties = {
    height: 200,
    padding: 48,
    overflow: "hidden",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.heartCircle}>
          <Heart
            width={25}
            height={25}
            active={active}
            onClick={() => setActive(!active)}
          />
        </div>
        <img src={item.url} alt="photo QR" onClick={showDrawer} />
      </div>
      <div className={styles.bottomContainer}>
        <span>{item.userName}</span>
        <div className={styles.heartCount}>
          <IoMdHeart />
          <span>{item.likeCount}</span>
        </div>
      </div>
      <Drawer
        title="4Q 상세보기"
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={open}
        height="97%"
        getContainer={false}
        className={styles.drawerContainer}
      >
        <div className={styles.detailContainer}>
          {/* Pass item as a prop to the Detail component */}
          <Detail item={item} />
        </div>
      </Drawer>
    </div>
  );
}

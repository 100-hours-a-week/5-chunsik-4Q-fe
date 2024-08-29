"use client";

import React, { useState } from "react";
import styles from "./item.module.css";
import mockup from "../../../../public/images/mock/concert.png";
import Heart from "@react-sandbox/heart";
import Detail from './detail'
import { Button, Drawer, theme } from "antd";
import { IoMdHeart } from "react-icons/io";

export default function Item() {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
        <img src={mockup.src} alt="photo QR" onClick={showDrawer} />
      </div>
      <div className={styles.bottomContainer}>
        <span>chen</span>
        <div className={styles.heartCount}>
          <IoMdHeart />
          <span>223</span>
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
        // size="large"
        className={styles.drawerContainer}
        // mask={false}
        extra={
          <>
            {/* <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button> */}
          </>
        }
      >
        <div className={styles.detailContainer}>
        <Detail />
        </div>
      
      </Drawer>
    </div>
  );
}

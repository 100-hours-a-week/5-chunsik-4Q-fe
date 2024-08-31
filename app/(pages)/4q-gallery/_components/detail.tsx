"use client";

import React, { useState } from "react";
import styles from "./detail.module.css";
import Heart from "@react-sandbox/heart";
import { IoIosCalendar } from "react-icons/io";
import { TiHeartFullOutline } from "react-icons/ti";
import { Button, Divider } from "antd";

type Item = {
  imageId: number;
  userName: string;
  url: string;
  likeCount: number;
  tags: string[];
  categoryName: string;
  createdAt: string;
};

type DetailProps = {
  item: Item;
};

export default function Detail({ item }: DetailProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.detailContainer}>
        <div className={styles.detailTopContainer}>
          <div className={styles.detailInfo}>
            <p className={styles.title}>{item.categoryName}</p>
            <p className={styles.nickname}>{item.userName}</p>
          </div>
          <div className={styles.heartContainer}>
            <Heart
              width={20}
              height={20}
              active={active}
              onClick={() => setActive(!active)}
            />
          </div>
        </div>
        <div className={styles.imgContainer}>
          <img src={item.url} alt="photo QR" />
        </div>
        <div className={styles.detailBottomContainer}>
          <div className={styles.detailBottomGroup}>
            <IoIosCalendar />
            <p>{item.createdAt}</p>
          </div>
          <div className={styles.detailBottomGroup}>
            <TiHeartFullOutline />
            <p>{item.likeCount}</p>
          </div>
        </div>
        <div className={styles.detailTagContainer}>
          {item.tags.map((tag, index) => (
            <div key={index} className={styles.tag}>
              {tag}
            </div>
          ))}
        </div>
        <Button className={styles.generateBtn}>이 이미지로 4Q 생성하기</Button>
      </div>
      <Divider style={{ width: '450px' }} />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import styles from "./item-card.module.css";
import Heart from "@react-sandbox/heart";
import Detail from "./detail";
import { Drawer, theme, message } from "antd";
import { IoMdHeart } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { likeImage, unlikeImage } from "../../../../service/photo_api";
import Lottie from 'react-lottie-player';
import heartLottie from '../../../../../public/rotties/heart-lottie.json';
import Image from "next/image";

type Item = {
  imageId: number;
  userName: string;
  url: string;
  likeCount: number;
  tags: string[];
  categoryName: string;
  createdAt: string;
  liked: boolean;
};

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(item.liked);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [playLottie, setPlayLottie] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    sessionStorage.setItem("createStep", "false");
  };

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

          setPlayLottie(true);
          setTimeout(() => {
            setPlayLottie(false);
          }, 1000); 
        }
      }
    } catch (error) {
      console.error("Failed to toggle like status:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        {playLottie && (
          <div className={styles.heartLottieContainer}>
            <Lottie
              animationData={heartLottie}
              play={playLottie}
              loop={false}
              style={{ opacity: 0.9 }}
            />
          </div>
        )}
        <div className={styles.heartCircle}>
          <Heart
            width={25}
            height={25}
            active={active}
            onClick={clickHeart}
          />
        </div>
        <div className={styles.imgContainer}>
          <Image
            width={200}
            height={200}
            src={item.url}
            alt="photo QR"
            onClick={showDrawer}
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.author}>
          <IoPerson />
          <span>{item.userName ? item.userName : '비로그인 회원'}</span>
        </div>
        <div className={styles.heartCount}>
          <IoMdHeart />
          <span>{likeCount}</span>
        </div>
      </div>
      <Drawer
        title="4Q 상세보기"
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
  );
}

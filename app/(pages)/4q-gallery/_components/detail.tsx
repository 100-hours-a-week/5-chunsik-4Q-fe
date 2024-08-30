"use client";

import React, { useState } from "react";
import styles from "./detail.module.css";
import mockup from "../../../../public/images/mock/concert.png";
import Heart from "@react-sandbox/heart";
import { IoIosCalendar } from "react-icons/io";
import { TiHeartFullOutline } from "react-icons/ti";
import { Button, Divider } from "antd";


export default function Datail() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.detailContainer}>
        <div className={styles.detailTopContainer}>
          <div className={styles.detailInfo}>
            <p className={styles.title}>챈 부럽다</p>
            <p className={styles.nickname}>드디어 기어나온 앤디</p>
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
          <img src={mockup.src} alt="photo QR" />
        </div>
        <div className={styles.detailBottomContainer}>
          <div className={styles.detailBottomGroup}>
          <IoIosCalendar />
          <p>2024/01/01</p>
          </div>
          <div className={styles.detailBottomGroup}>
          <TiHeartFullOutline />
          <p>123</p>
          </div>
        
        </div>
        <div className={styles.detailTagContainer}>
          <div className={styles.tag}>밝은</div>
          <div className={styles.tag}>자연 친화적</div>
        </div>
        <Button className={styles.generateBtn}>이 이미지로 4Q 생성하기</Button>
       
      </div>
     <Divider style={{width: '450px'}}/>
    </div>
    
  );
}

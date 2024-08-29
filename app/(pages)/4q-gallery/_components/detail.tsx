"use client";

import React, { useState } from "react";
import styles from "./detail.module.css";
import mockup from "../../../../public/images/mock/concert.png";
import Heart from "@react-sandbox/heart";

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
        <p className={styles.date}>2024/01/01</p>
      </div>
    </div>
  );
}

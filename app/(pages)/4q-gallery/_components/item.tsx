"use client";

import React, { useState } from "react";
import styles from "./item.module.css";
import mockup from "../../../../public/images/mock/concert.png";
import Heart from "@react-sandbox/heart";

export default function Item() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <img src={mockup.src} alt="photo QR" />
      </div>
      <div className={styles.bottomContainer}>
        <span>nickname</span>
        <div className={styles.heartContainer}>
          <Heart
            width={22}
            height={22}
            active={active}
            onClick={() => setActive(!active)}
          />
        </div>
      </div>
    </div>
  );
}

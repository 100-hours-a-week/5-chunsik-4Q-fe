"use client"

import styles from './hero2.module.css';
import bg from '../../../public/images/hero_bg.svg';
import Link from "next/link";
import hero1 from "../../../public/images/hero/hero1.png";
import hero2 from "../../../public/images/hero/hero2.png";
import hero3 from "../../../public/images/hero/hero3.png";

export default function Hero2() {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${bg.src})`}}>
            <div className={styles.text}>
            <p>Nachos are</p>
                <span className={`${styles.word} ${styles.wisteria}`>Photo QR/span>
                <span className={`${styles.word} ${styles.wisteria}`>Photo QR/span>
            </div>
        </div>
    );
}


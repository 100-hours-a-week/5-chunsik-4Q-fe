"use client"

import styles from './hero.module.css';
import bg from '../../public/images/hero_bg.svg';
import Link from "next/link";
import hero1 from "../../public/images/hero/hero1.png";
import hero2 from "../../public/images/hero/hero2.png";
import hero3 from "../../public/images/hero/hero3.png";

export default function Hero() {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${bg.src})`}}>
            <div className={styles.heading}>
                <h1>Photo QR</h1>
                <h2>WITH 4Q</h2>
                {/*<button>지금 체험하기</button>*/}
                <Link href="/4q-create" className={styles.tryBtn}>지금 체험하기</Link>
            </div>
            <div className={`${styles.imgContainer} ${styles.img1}`}>
                <img src={hero1.src} alt="menuExample" className={styles.heroImg}/>
            </div>
            <div className={`${styles.imgContainer} ${styles.img2}`}>
                <img src={hero2.src} alt="concertExample" className={styles.heroImg}/>
            </div>
            <div className={`${styles.imgContainer} ${styles.img3}`}>
                <img src={hero3.src} alt="concertExample" className={styles.heroImg}/>
            </div>
        </div>
    );
}


// <Link href="/about"><a>About me</a></Link>
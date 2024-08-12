"use client"

import styles from './hero.module.css';
import bg from '../../public/images/hero_bg.svg';
import Link from "next/link";

export default function Hero() {
    return (
        <div className={styles.container} style={{ backgroundImage: `url(${bg.src})` }}>
            <div className={styles.heading}>
                <h1>Photo QR</h1>
                <h2>WITH 4Q</h2>
                {/*<button>지금 체험하기</button>*/}
                <Link href="/4q-create" className={styles.tryBtn}>지금 체험하기</Link>
            </div>
            <div className={styles.buttonContainer}>
                {/* You can add buttons or other elements here */}
            </div>
        </div>
    );
}



// <Link href="/about"><a>About me</a></Link>
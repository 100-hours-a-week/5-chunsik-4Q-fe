"use client"

import styles from './hero.module.css';
import bg from '../../public/images/hero_bg.svg';

export default function Hero() {
    return (
        <div className={styles.container} style={{ backgroundImage: `url(${bg.src})` }}>
            <div className={styles.heading}>
                <h1>Photo QR</h1>
                <h2>WITH 4Q</h2>
                <button>지금 체험하기</button>
            </div>
            <div className={styles.buttonContainer}>
                {/* You can add buttons or other elements here */}
            </div>
        </div>
    );
}

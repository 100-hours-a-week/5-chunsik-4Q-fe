"use client";

import styles from './hero2.module.css';
import bg from '../../../../public/images/hero_bg.svg';

export default function Hero() {
    return (
        <div className={styles.container} style={{ backgroundImage: `url(${bg.src})` }}>
            <div className={styles.heading}>
               <div className={styles.words}>
                <span style={{marginLeft: '20px'}}>photo</span>
                <span style={{marginLeft: '90px'}}>pho</span>
                <span className={styles.orange} style={{marginLeft: '90px'}}>4Q</span>
                </div>
            </div>
            <div className={styles.heading}>
               <div className={styles.words_qr}>
            <span> QR</span>
                <span className={styles.orange}>Q</span>
                <span> </span>
                <span className={styles.orange}></span>
                <span> </span>
                </div>
            </div>
        
        </div>
    );
}

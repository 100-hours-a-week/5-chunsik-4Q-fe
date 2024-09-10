"use client";

import { useEffect } from 'react';
import styles from './hero.module.css';
import bg from '../../../../../public/images/hero_bg.svg';
import Link from "next/link";
import hero1 from "../../../../../public/images/hero/hero1.png";
import hero2 from "../../../../../public/images/hero/hero2.png";
import hero3 from "../../../../../public/images/hero/hero3.png";
import { useUserContext } from '@/context/UserContext';
import { requestAccessToken, requestUserInfo } from "@/service/auth_api";

import Lottie from 'react-lottie-player';
import arrowLottie from '../../../../../public/rotties/hero-arrow.json';

export default function Hero() {
    const { login, setAccessToken } = useUserContext();

    useEffect(() => {
        async function fetchAndSetUser() {
            try {
                const token = await requestAccessToken();
                if (token) {
                    setAccessToken(token);

                    const userInfo = await requestUserInfo();
                    if (userInfo) {
                        login(userInfo);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user information:", error);
            }
        }

        fetchAndSetUser();
    }, [login, setAccessToken]);

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${bg.src})` }}>
            <div className={styles.arrowContainer}>
                <div className={styles.arrowLottie}>
                    <Lottie
                        loop
                        animationData={arrowLottie}
                        play
                        style={{ width: 120, height: 120 }}
                    />
                </div>
            </div>

            <div className={styles.noise}></div>

            <div className={styles.heading}>
                <p className={styles.introTitle}>AI기반 포토큐알 이미지 생성 서비스</p>
                <h1>Photo QR</h1>
                <h2>WITH 4Q</h2>
                <Link href="/4q-create" className={styles.tryBtn}>지금 체험하기</Link>
            </div>
            <div className={`${styles.imgContainer} ${styles.img1}`}>
                <img src={hero1.src} alt="menuExample" className={styles.heroImg} />
            </div>
            <div className={`${styles.imgContainer} ${styles.img2}`}>
                <img src={hero2.src} alt="concertExample" className={styles.heroImg} />
            </div>
            <div className={`${styles.imgContainer} ${styles.img3}`}>
                <img src={hero3.src} alt="concertExample" className={styles.heroImg} />
            </div>
        </div>
    );
}

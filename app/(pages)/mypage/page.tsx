"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Button, Divider, message } from 'antd';
import Link from "next/link";
import { IoIosArrowDropright } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight } from "react-icons/md";
import { requestUserInfo } from '../../../service/auth_api';

import myIcon from '../../../public/images/icon/my_4q_icon.svg';
import likedIcon from '../../../public/images/icon/liked_4q_icon.svg';

export default function Page() {
    const router = useRouter();
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<{ nickname: string; email: string } | null>(null);

    const checkAuth = async () => {
        const token = localStorage.getItem('AccessToken');
        setAuthenticated(!!token);
        
        if (token) {
            try {
                const data = await requestUserInfo();
                if (data) {
                    setUserInfo({ nickname: data.nickname, email: data.email });
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogout = () => {
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('AccessToken');
        router.push('/login');
        message.success('로그아웃 되었습니다');
    };

    return (
        <div className={styles.container}>
            {!isAuthenticated && (
                <div className={styles.unauthUserInfoContainer}>
                    <div className={styles.unauthLoginContainer}>
                        <span>로그인하세요</span>
                        <Link href="/login"><MdKeyboardArrowRight className={styles.loginArrow} /></Link>
                    </div>
                    <div className={styles.unauthHelper}>
                        <p>로그인 후 생성한 4Q를 관리할 수 있어요.</p>
                    </div>
                </div>
            )}
            
            {isAuthenticated && userInfo && (
                <div className={styles.userInfoConatiner}>
                    <div className={styles.nickname}>
                        <span className={styles.bold}>{userInfo.nickname}</span>
                        <span className={styles.normal}>님, 안녕하세요!</span>
                    </div>
                    <span className={styles.email}>{userInfo.email}</span>
                </div>
            )}
            <Divider />
            <div className={styles.linkContainer}>
                <div className={styles.linkList}>
                    <div className={styles.linkText}>
                        <img src={myIcon.src} alt="my_4q_icon" className={styles.icon} />
                        <span>나의 4Q</span>
                    </div>
                    <Link href="/mypage/my-4q" className={styles.arrowContainer}><IoIosArrowDropright className={styles.arrowIcon} /></Link>
                </div>
                <div className={styles.linkList}>
                    <div className={styles.linkText}>
                        <img src={likedIcon.src} alt="my_4q_icon" className={styles.icon} />
                        <span>좋아요한 배경</span>
                    </div>
                    <Link href="/mypage/liked-4q" className={styles.arrowContainer}><IoIosArrowDropright className={styles.arrowIcon} /></Link>
                </div>
            </div>
            
            {isAuthenticated && (
                <div className={styles.logoutContainer}>
                <Button
                    type="primary"
                    shape="round"
                    icon={<IoLogOutOutline />}
                    size="large"
                    style={{ backgroundColor: "#D4D4D4", color: "#000" }}
                    onClick={handleLogout}
                >
                    로그아웃
                </Button>
            </div>
            )}
        </div>
    );
}

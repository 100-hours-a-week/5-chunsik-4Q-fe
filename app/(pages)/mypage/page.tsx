import styles from './page.module.css'
import { Button, Divider } from 'antd';
import Link from "next/link";
import { IoIosArrowDropright } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

import myIcon from '../../../public/images/icon/my_4q_icon.svg'
import likedIcon from '../../../public/images/icon/liked_4q_icon.svg'

export default function page() {
    return(
        <div className={styles.container}>
            <div className={styles.userInfoConatiner}>
                <div className={styles.nickname}>
                    <span className={styles.bold}>Chen</span>
                    <span className={styles.normal}>님, 안녕하세요!</span>
                </div>
                <span className={styles.email}>chenbabo@gmail.com</span>
            </div>
            <Divider />
            <div className={styles.linkContainer}>
                <div className={styles.linkList}>
                    <div className={styles.linkText}>
                        <img src={myIcon.src} alt="my_4q_icon" className={styles.icon}/>
                        <span>나의 4Q</span>
                    </div>
                    <Link href="/mypage/my-4q" className={styles.arrowContainer}><IoIosArrowDropright className={styles.arrowIcon}/></Link>

                </div>
                <div className={styles.linkList}>
                    <div className={styles.linkText}>
                        <img src={likedIcon.src} alt="my_4q_icon" className={styles.icon}/>
                        <span>좋아요한 4Q</span>
                    </div>
                    <Link href="/mypage/liked-4q" className={styles.arrowContainer}><IoIosArrowDropright className={styles.arrowIcon}/></Link>
                </div>
            </div>
            <div className={styles.logoutContainer}>
                <Button type="primary" shape="round" icon={<IoLogOutOutline />} size="large" style={{backgroundColor: "#D4D4D4", color: "#000"}}>
                    로그아웃
                </Button>
            </div>
        </div>

    );
}
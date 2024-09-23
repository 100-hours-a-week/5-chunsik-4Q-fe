"use client";

import styles from "./page.module.css";
import { Button, Divider, message } from "antd";
import Link from "next/link";
import { IoIosArrowDropright } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { requestLogout } from "@/service/auth_api";
import { useUserContext } from "@/context/UserContext"; // useUserContext를 import
import myIcon from "../../../../public/images/icon/my_4q_icon.svg";
import likedIcon from "../../../../public/images/icon/liked_4q_icon.svg";


export default function Page() {
  const { user, isLogin, logout } = useUserContext();

  const handleLogout = () => {
    requestLogout();
    logout();
  };

  const handleProtectedLinkClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      message.error("로그인이 필요한 기능입니다.");
    }
  };

  return (
    <div className={styles.container}>
      {!isLogin && (
        <div className={styles.unauthUserInfoContainer}>
          <div className={styles.unauthLoginContainer}>
            <span>로그인하세요</span>
            <Link href="/login">
              <MdKeyboardArrowRight className={styles.loginArrow} />
            </Link>
          </div>
          <div className={styles.unauthHelper}>
            <p>로그인 후 생성한 4Q를 관리할 수 있어요.</p>
          </div>
        </div>
      )}

      {isLogin && user && (
        <div className={styles.userInfoConatiner}>
          <div className={styles.nickname}>
            <span className={styles.bold}>{user.nickname}</span>
            <span className={styles.normal}>님, 안녕하세요!</span>
          </div>
          <span className={styles.email}>{user.email}</span>
          <div className={styles.profileEditBtn}>
            <Link href="/mypage/profile-edit">회원 정보 수정</Link>
          </div>
        </div>
      )}
      <Divider />
      <div className={styles.linkContainer}>
        <div className={styles.linkList}>
          <div className={styles.linkText}>
            <img src={myIcon.src} alt="my_4q_icon" className={styles.icon} />
            <span>나의 4Q</span>
          </div>
          {/* Added onClick handler to prevent navigation if not logged in */}
          <Link
            href="/mypage/my-4q"
            className={styles.arrowContainer}
            onClick={handleProtectedLinkClick}
          >
            <IoIosArrowDropright className={styles.arrowIcon} />
          </Link>
        </div>
        <div className={styles.linkList}>
          <div className={styles.linkText}>
            <img src={likedIcon.src} alt="my_4q_icon" className={styles.icon} />
            <span>좋아요한 배경</span>
          </div>
          {/* Added onClick handler to prevent navigation if not logged in */}
          <Link
            href="/mypage/liked-4q"
            className={styles.arrowContainer}
            onClick={handleProtectedLinkClick}
          >
            <IoIosArrowDropright className={styles.arrowIcon} />
          </Link>
        </div>
      </div>

      {isLogin && (
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

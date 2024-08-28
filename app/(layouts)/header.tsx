"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import logo from "../../public/images/logo.svg";
import logo_white from "../../public/images/logo_white.svg";
import { Slant as Hamburger } from "hamburger-react";
import { useRouter, usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { Button, message, Modal } from "antd";

export default function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLogo, setLogo] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("홈");
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const path = usePathname();

  const titles = [
    { path: "/login", title: "로그인" },
    { path: "/login/email", title: "로그인" },
    { path: "/signup/email", title: "회원가입" },
    { path: "/4q-create", title: "4Q 생성하기" },
    { path: "/4q-create/download/", title: "4Q 다운로드" },
    { path: "/4q-gallery", title: "4Q 갤러리" },
    { path: "/help-faq", title: "도움말/FAQ" },
    { path: "/mypage", title: "마이페이지" },
    { path: "/mypage/my-4q", title: "나의 4Q" },
    { path: "/mypage/liked-4q", title: "좋아요한 4Q" },
    { path: "/feedback", title: "피드백" },
  ];

  const handleBack = () => {
    if (path === "/4q-create") {
      setIsModalOpen(true);
    } else {
      router.back();
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const checkLogo = () => {
    if (path === "/") {
      setLogo(true);
    } else {
      setLogo(false);
    }
  };

  const getTitleForPath = () => {
    const matchedTitle = titles.find((item) => item.path === path);
    if (matchedTitle) {
      setTitle(matchedTitle.title);
    } else {
      setTitle("");
    }
  };

  const navFeedback = () => {
    setOpen(false);
    router.push('/feedback');
   
  }

  const handleLogout = () => {
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("AccessToken");
    router.push("/login");
    message.success("로그아웃 되었습니다");
  };

  const checkAuth = () => {
    const token = localStorage.getItem("AccessToken");
    setAuthenticated(!!token);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmBack = () => {
    setIsModalOpen(false);
    sessionStorage.removeItem('form_data');
    router.back();
  };

  useEffect(() => {
    checkLogo();
    getTitleForPath();
    checkAuth();
  }, [path]);

  return (
    <>
      <div className={styles.container}>
        {!isLogo ? (
          <div className={styles.backBtn}>
            <a onClick={handleBack}>
              <IoIosArrowBack />
            </a>
          </div>
        ) : (
          <Link href="/">
            <img src={logo.src} alt="Logo" className={styles.logo} />
          </Link>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.hamburgerMenu}>
          <div className={styles.hamburgerBorder}></div>
          <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
        </div>
        {isOpen && (
          <div className={styles.dimOverlay} onClick={closeMenu}></div>
        )}
        <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
          <div className={styles.menuTopContainer}>
          <img src={logo_white.src} alt="Logo" />
          <div className={styles.feedbackBtnContainer}>
          <Button className={styles.feedbackBtn} size="small" onClick={navFeedback}>
              피드백
          </Button>
          </div>
          </div>
         
          <ul>
            <li>
              <Link href="/" data-replace="홈" onClick={closeMenu}>
                <span>홈</span>
              </Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link href="/login" data-replace="로그인" onClick={closeMenu}>
                  <span>로그인</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/4q-create"
                data-replace="4Q 생성하기"
                onClick={closeMenu}
              >
                <span>4Q 생성하기</span>
              </Link>
            </li>
            <li>
              <Link
                href="/4q-gallery"
                data-replace="4Q 갤러리"
                onClick={closeMenu}
              >
                <span>4Q 갤러리</span>
              </Link>
            </li>
            <li>
              <Link
                href="/mypage"
                data-replace="마이페이지"
                onClick={closeMenu}
              >
                <span>마이페이지</span>
              </Link>
            </li>
            {isAuthenticated && (
              <div className={styles.logoutBtnContainer}>
                <Link href="/login" onClick={closeMenu}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<IoLogOutOutline />}
                    style={{ backgroundColor: "#D4D4D4", color: "#000" }}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
      <Modal
        title="뒤로가기"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        // width={400}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            머무르기
          </Button>,
          <Button key="back" type="primary" onClick={handleConfirmBack}>
            그래도 뒤로가기
          </Button>,
        ]}
      >
        페이지를 이동하면 지금까지 입력했던 정보가 사라집니다.
      </Modal>
    </>
  );
}

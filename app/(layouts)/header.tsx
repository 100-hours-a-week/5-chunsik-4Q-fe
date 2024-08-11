"use client"

import {useState} from 'react';
import Link from "next/link";
import styles from './header.module.css'
import logo from '../../public/images/logo.svg'
import logo_white from '../../public/images/logo_white.svg'
import { Slant as Hamburger } from 'hamburger-react';

export default function Header(){
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <Link href="/">
                <img src={logo.src} alt="Logo" className={styles.logo}/>
            </Link>
            <div className={styles.hamburgerMenu}>
                <div className={styles.hamburgerBorder}></div>
                <Hamburger
                    toggled={isOpen}
                        size={20}
                        toggle={setOpen}
                    />
                </div>
                <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                    <img src={logo_white.src} alt="Logo"/>
                    <ul>
                        <li><Link href="/" data-replace="홈"><span>홈</span></Link></li>
                        <li><Link href="/login" data-replace="로그인"><span>로그인</span></Link></li>
                        <li><Link href="/4q-create" data-replace="4Q 생성하기"><span>4Q 생성하기</span></Link></li>
                        <li><Link href="/4q-gallery" data-replace="4Q 갤러리"><span>4Q 갤러리</span></Link></li>
                        <li><Link href="/help-faq" data-replace="도움말/FAQ"><span>도움말/FAQ</span></Link></li>
                    </ul>
                </div>
        </div>
);
    }
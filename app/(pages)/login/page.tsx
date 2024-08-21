import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import logo from '../../../public/images/login_logo.png';
import kakao_icon from '../../../public/images/kakao.svg';

export default function Page() {
    const kakaoOauth = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a8a84270703466b91728cc7df1b03fbb&redirect_uri=https://localhost:8080/auth/kakao/callback";

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Image src={logo} alt="logo_black" className={styles.logoImg} />
            </div>
            <div className={styles.signupContainer}>
                <div className={styles.fastBubble}>
                    <div className={styles.fastSignup}>
                        5초만에 빠른 회원가입
                    </div>
                    <div className={styles.polygon}></div>
                </div>
                    <Link href={kakaoOauth} className={styles.kakaoButton}>
                        <img src={kakao_icon.src} alt="kakao_logo" className={styles.kakaoIcon}/>
                        카카오톡으로 시작하기
                    </Link>

                <div className={styles.emailOptions}>
                    <Link href="/login/email" className={styles.emailLink}>
                        이메일로 로그인
                    </Link>
                    <span className={styles.separator}>|</span>
                    <Link href="/signup/email" className={styles.emailLink}>
                        이메일로 회원가입
                    </Link>
                </div>
                <Link href="/" className={styles.laterSignup}>
                    나중에 가입할래요
                </Link>
            </div>
        </div>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import logo from '../../../public/images/logo.svg';

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Image src={logo} alt="logo_black" className={styles.logoImg} />
            </div>
            <div className={styles.signupContainer}>
                <div className={styles.fastBuble}>
                    <div className={styles.fastSignup}>
                        5초만에 빠른 회원가입
                    </div>
                    <div className={styles.polygon}></div>
                </div>


                <button className={styles.kakaoButton}>

                    {/*<span className={styles.kakaoIcon}></span>*/}
                    카카오톡으로 시작하기
                </button>
                <div className={styles.emailOptions}>
                    <Link href="/login" className={styles.emailLink}>
                        이메일로 로그인
                    </Link>
                    <span className={styles.separator}>|</span>
                    <Link href="/signup" className={styles.emailLink}>
                        이메일로 회원가입
                    </Link>
                </div>
                <div className={styles.laterSignup}>
                    나중에 가입할래요
                </div>
            </div>
        </div>
    );
}

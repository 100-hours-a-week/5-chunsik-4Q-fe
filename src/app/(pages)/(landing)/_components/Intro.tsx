"use client"

import styles from './intro.module.css';
import step1 from '../../../../../public/images/step1.gif';
import step2 from '../../../../../public/images/step2.gif';
import step3 from '../../../../../public/images/step3.gif';
import step1_icon from '../../../../../public/images/icon/step1_icon.png';
import step2_icon from '../../../../../public/images/icon/step2_icon.png';
import step3_icon from '../../../../../public/images/icon/step3_icon.png';

import Link from 'next/link';


export default function Intro() {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                간편하게 포토큐알을 만들어보세요
            </div>
            <div className={styles.subTitle}>
                바로 사용할 수 있는 포토큐알, 1분이면 충분해요. <br />
                AI가 어울리는 이미지를 제작해줄거에요.
            </div>
            <Link href="/4q-create" className={styles.tryBtn}>
                4Q 생성하러가기
            </Link>

            <div className={styles.stepsContainer}>
                <div className={styles.title}>
                    4Q를 만드는 3단계
                </div>
                <div className={`${styles.stepItem} stepItem`}>
                    <div className={styles.stepIndicator}>STEP 1</div>
                    <div className={styles.stepTitle}>필요한 정보를 입력해주세요</div>
                    <div className={styles.stepImg}>
                        <img src={step1.src} alt="step1_intro" />
                    </div>
                    <img src={step1_icon.src} alt="step1_icon" className={styles.rightIcon} />
                </div>
                <div className={`${styles.stepItem} stepItem`}>
                    <div className={styles.stepIndicator}>STEP 2</div>
                    <div className={styles.stepTitle}>배경이미지를 선택해주세요</div>
                    <div className={styles.stepImg}>
                        <img src={step2.src} alt="step2_intro" />
                    </div>
                    <img src={step2_icon.src} alt="step2_icon" className={styles.rightIcon} />
                </div>
                <div className={`${styles.stepItem} stepItem`}>
                    <div className={styles.stepIndicator}>STEP 3</div>
                    <div className={styles.stepTitle}>QR의 위치를 조정해주세요</div>
                    <div className={styles.stepImg}>
                        <img src={step3.src} alt="step3_intro" />
                    </div>
                    <img src={step3_icon.src} alt="step3_icon" className={styles.rightIcon} />
                </div>
            </div>
        </div>
    );
}

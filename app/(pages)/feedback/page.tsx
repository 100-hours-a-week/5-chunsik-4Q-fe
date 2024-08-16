"use client"

import styles from './page.module.css'
import feedback from '../../../public/images/feedback.png'
// import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { FaRegFaceAngry, FaRegFaceFrown, FaRegFaceMeh, FaRegFaceSmile, FaRegFaceKissWinkHeart } from "react-icons/fa6";
import { Rate, Input, Button  } from 'antd';
import Link from "next/link";

const { TextArea } = Input;

const customIcons: Record<number, React.ReactNode> = {
    1: <FaRegFaceAngry />,
    2: <FaRegFaceFrown />,
    3: <FaRegFaceMeh />,
    4: <FaRegFaceSmile />,
    5: <FaRegFaceKissWinkHeart />,
};


export default function Page() {
    return (
        <div className={styles.container}>
            <img src={feedback.src} alt="feedback_image" />
            <div className={styles.feedbackForm}>
                <div className={styles.title}>
                    4Q 서비스 이용에 얼마나 만족하셨나요?
                </div>
                <div className={styles.rateForm}>
                <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} style={{ fontSize: 34 }}/>
                    <div className={styles.rateText}>
                        <div className={styles.rateScore}>
                            매우 불만족
                        </div>
                        <div className={styles.rateScore}>
                            매우 만족
                        </div>
                    </div>

                </div>
                <TextArea
                    showCount
                    maxLength={200}
                    // onChange={onChange}
                    placeholder="추가로 하고 싶은 말씀이 있으신가요?"
                    style={{ height: 120, width: '80%', resize: 'none' }}
                />
                <Button type="primary" className={styles.submitBtn} size="middle">제출하기</Button>
                <Link href="/" className={styles.navigateHome}>
                    홈으로 이동
                </Link>
            </div>

        </div>
    );
}
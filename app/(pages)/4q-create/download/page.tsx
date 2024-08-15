import styles from './page.module.css'
import { Image, Button } from 'antd';
import { LuDownload } from "react-icons/lu";
import { BiSolidShareAlt } from "react-icons/bi";
import result from '../../../../public/images/mock/exhibition.png'


export default function page() {
    return (
        <div className={styles.container}>
            <div className={styles.photoContainer}>
                <Image
                    width={250}
                    height={370}
                    src={result.src}
                    placeholder="미리보기"
                />
            </div>
            <div className={styles.title}>
                전시회 안내포토
            </div>
            <div className={styles.btnContainer}>
                <Button type="primary" icon={<LuDownload />} size="large" className={styles.downloadBtn}>
                    다운로드
                </Button>
                <Button type="primary" icon={<BiSolidShareAlt />} size="large" className={styles.shareBtn}/>
            </div>
            <Button
                type="link"
                href="/"
                className={styles.mainBtn}
            >
                메인으로 가기
            </Button>
        </div>
    );
}
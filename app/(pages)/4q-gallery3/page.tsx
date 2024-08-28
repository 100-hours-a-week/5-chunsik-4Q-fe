import styles from './page.module.css'
import construction from '../../../public/images/construction.png'

export default function Page() {
    return (
        <div className={styles.container}>
            <img src={construction.src} alt="construction"/>
            <div className={styles.title}>
               현재 페이지는 <span className={styles.orange}>공사중</span>입니다.
            </div>
            <div className={styles.subTitle}>
                "빠른 시일 내에 오픈하도록 노력하겠습니다."
            </div>
        </div>
    );
}
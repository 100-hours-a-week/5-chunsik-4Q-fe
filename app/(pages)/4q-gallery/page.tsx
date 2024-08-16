import styles from './page.module.css'
import construction from '../../../public/images/construction.png'

export default function Page() {
    return (
        <div className={styles.container}>
            <img src={construction.src} alt="construction"/>
            <div>
                갤러리가 공사중입니다!

            </div>
        </div>
    );
}
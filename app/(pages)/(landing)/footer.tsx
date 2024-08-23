import styles from './footer.module.css'
import logo from '../../../public/images/logo_white.svg'

export default function Footer() {
    return (
        <div className={styles.container}>
            <img src={logo.src} alt="footer_logo" className={styles.logo} />
            <div className={styles.content}>
                <div className={styles.information}>
                    <span>
                    제주특별자치도 제주시 특별자치도 이도이동 1921 | 대표이사 : chen
                    </span>
                </div>
            <div className={styles.text}>Copyright &#9426; qqqq.world</div>
            </div>
            
            
        </div>
    );
}

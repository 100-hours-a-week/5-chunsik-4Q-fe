import styles from './footer.module.css'
import logo from '../../../public/images/logo_white.svg'

export default function Footer() {
    return (
        <div className={styles.container}>
            <img src={logo.src} alt="footer_logo" className={styles.logo} />
            <div className={styles.text}>&#9426; qqqq.world</div>
        </div>
    );
}

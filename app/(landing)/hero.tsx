import styles from './hero.module.css'

export default function Hero() {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>Photo QR</h1>
                <h2>WITH 4Q</h2>
                <button>지금 체험하기</button>
            </div>
            <div className={styles.buttonContainer}>

            </div>
        </div>
    );
}
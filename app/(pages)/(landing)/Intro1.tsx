import styles from './intro1.module.css'

export default function Intro1() {
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                간편하게 포토큐알을 만들어보세요
            </div>
            <div className={styles.subTitle}>
                바로 사용할 수 있는 포토큐알, 1분이면 충분해요. <br />
                    손쉽게 멋진 큐알을 만들어보세요.
            </div>
            <button className={styles.tryBtn}>
                4Q 생성하러가기
            </button>

        </div>
    );
}

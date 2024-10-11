import Image from "next/image";
import styles from './not-found.module.css'
import notFound from '../../public/images/not_found.png'

export default function NotFound(){
    return (
        <div className={styles.container}>
            <Image src={notFound} alt='not found img' width={380} height={245}/>
            <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
        </div>
    );
}
import styles from './page.module.css'
import Hero from "./hero";
import Hero2 from "./hero2";
import Demo from "./demo";
import Footer from "./footer";
import Intro from "./Intro";

export default function Page() {
    return (
        <div className={styles.container}>
                <Hero />
                <Hero2 />
                <Intro/>
                <Demo/>
                <Footer />
        </div>
    );
}

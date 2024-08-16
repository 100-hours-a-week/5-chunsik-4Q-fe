import styles from './page.module.css'
import Hero from "./hero";
import Demo from "./demo";
import Footer from "./footer";
import Intro from "./Intro";

export default function Page() {
    return (
        <div className={styles.container}>
                <Hero />
                <Intro/>
                <Demo/>
                <Footer />
        </div>
    );
}

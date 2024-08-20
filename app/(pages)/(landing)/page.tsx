import styles from './page.module.css'
import Hero from "./_components/hero";
// import Hero2 from "./hero2";
import Demo from "./_components/demo";
import Footer from "./_components/footer";
import Intro from "./_components/Intro";

export default function Page() {
    return (
        <div className={styles.container}>
                <Hero />
                {/* <Hero2 /> */}
                <Intro/>
                <Demo/>
                <Footer />
        </div>
    );
}

// "use client"
export const dynamic = "force-dynamic";

import styles from './page.module.css'
import Hero from "./_components/hero";
import Demo from "./_components/demo";
import Footer from "./_components/footer";
import Intro from "./_components/Intro";

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

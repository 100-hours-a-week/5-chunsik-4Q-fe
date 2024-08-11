"use client"

import  { useRef, useEffect, useState } from 'react';
import styles from './page.module.css'
import Hero from "./hero";
import Demo from "./demo";


export default function Page() {
    const [bgColor, setBgColor] = useState('#ffffff');
    const containerRef = useRef(null);

    const heroRef = useRef(null);
    const introRef = useRef(null);
    const demoRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    switch (entry.target) {
                        case heroRef.current:
                            setBgColor('#ffffff');
                            break;
                        case introRef.current:
                            setBgColor('pink');
                            break;
                        case demoRef.current:
                            setBgColor('#EBE7E0');
                            break;
                        default:
                            setBgColor('#ffffff');
                    }
                }
            });
        }, options);

        if (heroRef.current) observer.observe(heroRef.current);
        if (introRef.current) observer.observe(introRef.current);
        if (demoRef.current) observer.observe(demoRef.current);

        return () => {
            if (heroRef.current) observer.unobserve(heroRef.current);
            if (introRef.current) observer.unobserve(introRef.current);
            if (demoRef.current) observer.unobserve(demoRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.container} style={{backgroundColor: bgColor}}>
            <div ref={heroRef} className={styles.hero}>
                <Hero />
            </div>
            <div ref={introRef} className={styles.intro}>
                {/*<Intro/>*/}
            </div>
            <div ref={demoRef} className={styles.demo}>
                <Demo/>
            </div>
            <div ref={introRef} className={styles.intro}>
                {/*<Intro/>*/}
            </div>
        </div>
    );
}
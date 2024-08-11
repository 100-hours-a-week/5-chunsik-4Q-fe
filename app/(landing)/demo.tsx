"use client"

import { useState } from 'react';
import styles from './Demo.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import mockup from '../../public/images/mockup.svg'
import type { Swiper as SwiperType } from 'swiper';

export default function Demo() {
    const [swiperIndex, setSwiperIndex] = useState(0); // For pagination
    const [swiper, setSwiper] = useState<SwiperType>(); // For slide control

    const handlePrev = () => {
        swiper?.slidePrev()
    }

    const handleNext = () => {
        swiper?.slideNext()
    }
    return (
        <div className={styles.container}>
            <div className={styles.mockUpContainer}>
                <img src={mockup.src} alt="mockup" className={styles.mockup} />
            </div>
            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                pagination={{ clickable: true }}
                navigation={false}
                modules={[Navigation]}
                className={styles.swiper}
                onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
                onSwiper={(e) => setSwiper(e)}
            >
                <SwiperSlide>
                    <div className={styles.slideContainer}>
                        {/*<div className={styles.slideImg}></div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideContainer2}>
                        {/*<div className={styles.slideImg}></div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideContainer3}>
                        {/*<div className={styles.slideImg}></div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
            </Swiper>
            <div className={styles.btnContainer}>
                <button onClick={handlePrev} className={styles.arrowBtn}><IoArrowBackSharp /></button>
                <div>
                    <span>{swiperIndex + 1}</span>
                </div>
                <button onClick={handleNext} className={styles.arrowBtn}><IoArrowForwardSharp /></button>
            </div>
        </div>
    );
}
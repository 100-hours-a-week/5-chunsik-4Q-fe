"use client"

import { useState } from 'react';
import styles from './demo.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
import Link from 'next/link';

import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import mockup from '../../../public/images/mockup.svg'
import concert from '../../../public/images/mock/concert.png'
import entrance from '../../../public/images/mock/entrance.png'
import restaurant from '../../../public/images/mock/restaurant.png'
import exhibition from '../../../public/images/mock/exhibition.png'
import wedding from '../../../public/images/mock/wedding.png'


export default function Demo() {
    const [swiperIndex, setSwiperIndex] = useState(0); // For pagination
    const [swiper, setSwiper] = useState<SwiperType>(); // For slide control

    const titles = ['콘서트 정보', '출입증', '식당 메뉴판', '전시회 안내', '청첩장'];

    const handlePrev = () => {
        swiper?.slidePrev()
    }

    const handleNext = () => {
        swiper?.slideNext()
    }
    return (
        <div className={styles.container}>
            {/*<div className={styles.mockUpContainer}>*/}
            {/*<img src={mockup.src} alt="mockup" />*/}
            {/*</div>*/}
            <div className={styles.subTitle}>
                <span>4Q 활용</span>
                <div className={styles.highliter}>예시</div>
            </div>
            <Link href="/4q-gallery" className={styles.allBtn}>
            전체보기
            {/* <a className={styles.allBtn}>전체보기</a> */}
            </Link>


            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                pagination={{clickable: true}}
                navigation={false}
                modules={[Navigation]}
                className={styles.swiper}
                onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
                onSwiper={(e) => setSwiper(e)}
            >

                <SwiperSlide>
                    <div className={styles.slideContainer}>
                        <img src={concert.src} alt="concertExample" />
                        {/*<div className={styles.slideImg}></div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideContainer}>
                        <img src={entrance.src} alt="entranceExample"/>
                        {/*<div className={styles.slideImg}></div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideContainer}>
                        <img src={restaurant.src} alt="restaurantExample"/>
                        {/*<div className={styles.slideImg}></div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideContainer}>
                        <img src={exhibition.src} alt="exhibitionExample"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideContainer}>
                        <img src={wedding.src} alt="weddingExample"/>
                    </div>
                </SwiperSlide>

            </Swiper>

            <div className={styles.btnContainer}>
                <button onClick={handlePrev} className={styles.arrowBtn}><IoArrowBackSharp/></button>
                <div>
                    {/*<span>{swiperIndex + 1}</span>*/}
                    <span>{titles[swiperIndex]}</span>
                </div>
                <button onClick={handleNext} className={styles.arrowBtn}><IoArrowForwardSharp/></button>
            </div>
            <img src={mockup.src} alt="mockup" className={styles.mockupImg}/>
        </div>
    );
}
"use client";

import { useState, useRef } from "react";
import styles from "./demo.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "motion/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import mockup from "../../../../../public/images/mockup.svg";
import concert from "../../../../../public/images/mock/concert.png";
import entrance from "../../../../../public/images/mock/entrance.png";
import restaurant from "../../../../../public/images/mock/restaurant.png";
import exhibition from "../../../../../public/images/mock/exhibition.png";
import wedding from "../../../../../public/images/mock/wedding.png";

export default function Demo() {
  const scrollRef = useRef(null);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();

  const titles = [
    "콘서트 정보",
    "출입증",
    "식당 메뉴판",
    "전시회 안내",
    "청첩장",
  ];

  const handlePrev = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
  };
  return (
    <div className={styles.container}>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ root: scrollRef, once: false }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2 
            }
          }
        }}
        className={styles.subTitle}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          4Q 활용
        </motion.span>
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className={styles.highliter}
        >
          예시
        </motion.div>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className={styles.allBtnContainer}
      >
        <Link href="/4q-gallery" className={styles.allBtn}>
          전체보기
        </Link>
      </motion.div>

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
            <img src={concert.src} alt="concertExample" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slideContainer}>
            <img src={entrance.src} alt="entranceExample" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slideContainer}>
            <img src={restaurant.src} alt="restaurantExample" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slideContainer}>
            <img src={exhibition.src} alt="exhibitionExample" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slideContainer}>
            <img src={wedding.src} alt="weddingExample" />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className={styles.btnContainer}>
        <button onClick={handlePrev} className={styles.arrowBtn}>
          <ArrowLeftOutlined />
        </button>
        <div>
          <span>{titles[swiperIndex]}</span>
        </div>
        <button onClick={handleNext} className={styles.arrowBtn}>
          <ArrowRightOutlined />
        </button>
      </div>
      <img src={mockup.src} alt="mockup" className={styles.mockupImg} />
    </div>
  );
}

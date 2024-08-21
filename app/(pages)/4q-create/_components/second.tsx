import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './second.module.css';
import mock from '../../../../public/images/mock_4q.png';
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FaDice } from "react-icons/fa6";
import { Button } from 'antd';
import Lottie from 'react-lottie-player';
import loadingLottie from '../../../../public/rotties/image-loading.json';

export default function Second() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [loading, setLoading] = useState(true); // State to manage the loading visibility

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 6000);

        return () => clearTimeout(timer); 
    }, []);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <Lottie
                    loop
                    animationData={loadingLottie}
                    play
                    style={{ width: 400, height: 400 }}
                />
                <div className={styles.loadingText}>
                    <p>잠시만 기다려주세요.</p>
                    <p>잠시만 기다려주세요. 배경이미지가 생성중입니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.subTitle}>
                배경이미지를 선택해주세요.
            </div>
            <div className={styles.sliderContainer} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {[...Array(4)].map((_, idx) => (
                        <div
                            key={idx}
                            className={`${styles.emblaSlide} ${idx === selectedIndex ? styles.activeSlide : styles.inactiveSlide}`}
                        >
                            <img src={mock.src} alt={`Slide ${idx + 1}`} />
                        </div>
                    ))}
                </div>
                <button className={styles.prevButton} onClick={scrollPrev}><ArrowLeftOutlined /></button>
                <button className={styles.nextButton} onClick={scrollNext}><ArrowRightOutlined /></button>
            </div>
            <div className={styles.randomBtnContainer}>
            </div>
        </div>
    );
}

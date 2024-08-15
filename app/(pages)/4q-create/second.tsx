import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './second.module.css';
import mock from '../../../public/images/mock_4q.png';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaDice } from "react-icons/fa6";
import { Button } from 'antd';

export default function Second() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loadings, setLoadings] = useState<boolean[]>([]);

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

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className={styles.container}>
            <div className={styles.subTitle}>
                QR의 위치를 선택해주세요.
            </div>
            <div className={styles.sliderContainer} ref={emblaRef}>

                <div className={styles.emblaContainer}>
                    {[...Array(4)].map((_, idx) => (
                        <div
                            key={idx}
                            className={`${styles.emblaSlide} ${idx === selectedIndex ? styles.activeSlide : styles.inactiveSlide}`}
                        >
                            <img src={mock.src} alt={`Slide ${idx + 1}`}/>
                        </div>
                    ))}
                </div>
                <button className={styles.prevButton} onClick={scrollPrev}><IoIosArrowBack/></button>
                <button className={styles.nextButton} onClick={scrollNext}><IoIosArrowForward/></button>
                {/*<div className={styles.dots}>*/}
                {/*    {[...Array(5)].map((_, idx) => (*/}
                {/*        <button*/}
                {/*            key={idx}*/}
                {/*            className={`${styles.dot} ${idx === selectedIndex ? styles.activeDot : ''}`}*/}
                {/*            onClick={() => emblaApi && emblaApi.scrollTo(idx)}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
            <div className={styles.randomBtnContainer}>
                <Button
                    type="primary"
                    icon={<FaDice style={{ fontSize: '20px' }}/>}
                    loading={loadings[1]}
                    onClick={() => enterLoading(1)}
                    className={styles.randomBtn}
                >
                   3
                </Button>
                {/*<button className={styles.randomBtn}>*/}
                {/*    <FaDice/><span>3</span>*/}
                {/*</button>*/}
            </div>

        </div>
    );
}

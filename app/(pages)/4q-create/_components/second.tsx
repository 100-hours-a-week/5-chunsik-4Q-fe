import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './second.module.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Lottie from 'react-lottie-player';
import loadingLottie from '../../../../public/rotties/image-loading.json';
import { generatePhotoImg } from '../../../../service/photo_api';

interface FormData {
    category: string;
    tags: string;
}

export default function Second() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [storedFormData, setStoredFormData] = useState<FormData | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem('form_data');
        if (storedData) {
            const parsedData: FormData = JSON.parse(storedData);
            setStoredFormData(parsedData);
        }
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            if (storedFormData) {
                try {
                    const response = await generatePhotoImg(
                        storedFormData.category,
                        storedFormData.tags,
                    );
                    setImageUrls(response.url); 
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            } else {
                console.log('No form data found in sessionStorage');
            }
        };
        fetchImages();
    }, [storedFormData]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

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

    return (
        <div className={styles.container}>
            {/* <div className={styles.loadingContainer}>
               <div className={styles.loadingTextContainer}>
               <p>잠시만 기다려주세요.</p>
               <p>배경 이미지가 생성중입니다.</p>
               </div>
                <div className={styles.lottieLoadingContainer}>
                <Lottie
                    loop
                    animationData={loadingLottie}
                    play
                    style={{ width: 400, height: 400 }}
                />
                </div>
            </div> */}
            <div className={styles.subTitle}>
                배경이미지를 선택해주세요.
            </div>
            <div className={styles.sliderContainer} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {imageUrls.map((url, idx) => (
                        <div
                            key={idx}
                            className={`${styles.emblaSlide} ${idx === selectedIndex ? styles.activeSlide : styles.inactiveSlide}`}
                        >
                            <img src={url} alt={`Slide ${idx + 1}`} />
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

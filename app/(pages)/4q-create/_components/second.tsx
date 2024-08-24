import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './second.module.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FaDice } from "react-icons/fa6";
import { Button } from 'antd';
import Lottie from 'react-lottie-player';
import loadingLottie from '../../../../public/rotties/image-loading.json';
import { generatePhotoImg } from '../../../../service/photo_api';
import { getShortenUrl } from "../../../../service/shorten_api";

interface FormData {
    category: string;
    tags: string;
    url: string;
    shorten_url?: string;
}

export default function Second() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [storedFormData, setStoredFormData] = useState<FormData | null>(null);
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem('form_data');
        if (storedData) {
            const parsedData: FormData = JSON.parse(storedData);
            setStoredFormData(parsedData);
        }
    }, []);

    useEffect(() => {
        const fetchShortenUrl = async () => {
          if (storedFormData?.url) {
            try {
              const shorten_url = await getShortenUrl(storedFormData.url);
              const updatedFormData = { ...storedFormData, shorten_url };
              sessionStorage.setItem('form_data', JSON.stringify(updatedFormData));
            } catch (error) {
              console.error('Failed to shorten URL:', error);
            }
          }
        };
        fetchShortenUrl();
    }, [storedFormData]);

    const fetchImages = useCallback(async () => {
        if (storedFormData) {
            try {
                setLoading(true); 
                const response = await generatePhotoImg(
                    storedFormData.category,
                    storedFormData.tags,
                );

                if (Array.isArray(response.url)) {
                    setImageUrls(prevUrls => [...prevUrls, ...response.url]);
                } else if (typeof response.url === 'string') {
                    setImageUrls(prevUrls => [...prevUrls, response.url]);
                } else {
                    console.error('Unexpected response format:', response.url);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false); 
            }
        } else {
            console.log('No form data found in sessionStorage');
        }
    }, [storedFormData]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

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

    const handleRandomButtonClick = async () => {
        setLoadings(prevLoadings => {
            const newLoadings = [...prevLoadings];
            newLoadings[1] = true;
            return newLoadings;
        });
        await fetchImages();
        setLoadings(prevLoadings => {
            const newLoadings = [...prevLoadings];
            newLoadings[1] = false;
            return newLoadings;
        });
    };

    return (
        <div className={styles.container}>
            {loading && (
                <div className={styles.loadingContainer}>
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
                </div>
            )}
            {!loading && (
                <>
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
                </>
            )}
            <div className={styles.randomBtnContainer}>
                <Button
                    type="primary"
                    icon={<FaDice style={{ fontSize: '20px' }} />}
                    loading={loadings[1]}
                    onClick={handleRandomButtonClick}
                    className={styles.randomBtn}
                >
                    3
                </Button>
            </div>
        </div>
    );
}

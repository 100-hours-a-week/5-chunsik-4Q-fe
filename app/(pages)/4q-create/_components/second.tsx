import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './second.module.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FaDice } from "react-icons/fa6";
import { Button, message } from 'antd';
import Lottie from 'react-lottie-player';
import loadingLottie from '../../../../public/rotties/image-loading.json';
import { generatePhotoImg } from '../../../../service/photo_api';
import { getShortenUrl } from "../../../../service/shorten_api";

interface FormData {
    category: string;
    tags: string;
    url: string;
    shorten_url?: string;
    backgroundImageUrl?: string;
}

export default function Second() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [storedFormData, setStoredFormData] = useState<FormData | null>(null);
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [randomButtonCount, setRandomButtonCount] = useState(3);  // Random button click count

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
                    const result = await getShortenUrl(storedFormData.url);

                    if (typeof result === 'object' && result.shortenUrl && result.shortenUrlId) {
                        const updatedFormData = { 
                            ...storedFormData, 
                            shortenUrl: result.shortenUrl, 
                            shortenUrlId: result.shortenUrlId 
                        };
                        sessionStorage.setItem('form_data', JSON.stringify(updatedFormData));
                    } else {
                        console.error('Unexpected result format:', result);
                    }
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

    // useEffect(() => {
    //     fetchImages(); 
    // }, []); 
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();

        if (imageUrls[selectedIndex]) {
            console.log(`Current image URL: ${imageUrls[selectedIndex]}`);

            const updatedFormData = {
                ...storedFormData,
                backgroundImageUrl: imageUrls[selectedIndex]
            };
            // setStoredFormData(updatedFormData);
            sessionStorage.setItem('form_data', JSON.stringify(updatedFormData));
        }
    }, [emblaApi, onSelect, selectedIndex, imageUrls]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const handleRandomButtonClick = async () => {
        if (randomButtonCount <= 0) {
            message.error('더 이상 이미지를 생성할 수 없습니다.');
            return;
        }

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

        setRandomButtonCount(prevCount => prevCount - 1);
    };

    return (
        <div className={styles.container}>
            {/* {loading && (
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
            )} */}
            {!loading && (
                <div className={styles.contentContainer}>
                    <div className={styles.subTitle}>
                        배경이미지를 선택해주세요.
                    </div>
                    <div className={styles.sliderContainer} ref={emblaRef}>
                        <div className={styles.emblaContainer}
                        style={{ justifyContent: imageUrls.length === 1 ? 'center' : 'flex-start' }}>
                            {imageUrls.map((url, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.emblaSlide} ${idx === selectedIndex ? styles.activeSlide : styles.inactiveSlide}`}
                                    
                                >
                                    <img src={url} alt={`Slide ${idx + 1}`} />
                                </div>
                            ))}
                        </div>

                        {imageUrls.length > 1 && (
                            <>
                                <button className={styles.prevButton} onClick={scrollPrev}><ArrowLeftOutlined /></button>
                                <button className={styles.nextButton} onClick={scrollNext}><ArrowRightOutlined /></button>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className={styles.randomBtnContainer}>
                <Button
                    type="primary"
                    icon={<FaDice style={{ fontSize: '20px' }} />}
                    loading={loadings[1]}
                    onClick={handleRandomButtonClick}
                    className={styles.randomBtn}
                >
                    {randomButtonCount}
                </Button>
            </div>
        </div>
    );
}

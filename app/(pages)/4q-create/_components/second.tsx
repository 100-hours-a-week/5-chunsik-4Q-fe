import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './second.module.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FaDice } from "react-icons/fa6";
import { Button, message } from 'antd';
import { generatePhotoImg } from '../../../../service/photo_api';
import { getShortenUrl } from "../../../../service/shorten_api";
import tagArrow from '../../../../public/images/tag_arrow.png'

interface FormData {
    url: string;
    shortenUrl: string;
    title: string;
    backgroundImageUrl: string;
    backgroundImaged: string;  
    shortenUrlId: number;
    tags: string[];
    category: string;
  }

export default function Second() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [storedFormData, setStoredFormData] = useState<FormData | null>(null);
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [randomButtonCount, setRandomButtonCount] = useState(3);  // Random button click count

    useEffect(() => {
        const storedData = sessionStorage.getItem('form_data');
        if (storedData) {
            const parsedData: FormData = JSON.parse(storedData);
            setStoredFormData(parsedData);
        }
    }, []);
    
    const fetchImages = useCallback(async () => {
        if (storedFormData) {
            try {
                // Step 1: Check if shortenUrl is missing
                if (!storedFormData.shortenUrl) {
                    // Step 2: Fetch the shortened URL
                    try {
                        const result = await getShortenUrl(storedFormData.url);
    
                        if (typeof result === 'object' && result.shortenUrl && result.shortenUrlId) {
                            // Update the form data with the shortened URL
                            const updatedFormData = {
                                ...storedFormData,
                                shortenUrl: result.shortenUrl,
                                shortenUrlId: result.shortenUrlId
                            };
                            // Save updated form data to sessionStorage
                            sessionStorage.setItem('form_data', JSON.stringify(updatedFormData));
                            // Update the local state with the new form data
                            setStoredFormData(updatedFormData);
                        } else {
                            console.error('Unexpected result format:', result);
                        }
                    } catch (error) {
                        console.error('Failed to shorten URL:', error);
                    }
                }
    
                // Step 3: Fetch the images based on the tags and category
                const response = await generatePhotoImg(
                    storedFormData.category,
                    storedFormData.tags,
                );
    
                if (Array.isArray(response.url)) {
                    setImageUrls(prevUrls => [...prevUrls, ...response.url]);
                    setImageIds(prevUrls => [...prevUrls, ...response.backgroundImageId]);
                } else if (typeof response.url === 'string') {
                    setImageUrls(prevUrls => [...prevUrls, response.url]);
                    setImageIds(prevUrls => [...prevUrls, response.backgroundImageId]);
                } else {
                    console.error('Unexpected response format:', response.url);
                }
    
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        } else {
            console.log('No form data found in sessionStorage');
        }
    }, [storedFormData]);
    

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
                backgroundImageUrl: imageUrls[selectedIndex],
                backgroundImageId: imageIds[selectedIndex]
            };
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
            {randomButtonCount === 3 && (
                <div className={styles.tagContainer}>
                    <img src={tagArrow.src} alt='tag arrow' className={styles.tagArrowImg}/>
                    <p>아래 태그를 바탕으로 AI 이미지가 생성됩니다.</p>
                    <p>이미지는 최대 3번까지 요청할 수 있어요.</p>
                    <div className={styles.tags}>
                        {storedFormData?.tags.map((tag, index) => (
                            <div key={index} className={styles.tagItem}>
                                #{tag}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className={styles.contentContainer}>
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

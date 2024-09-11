"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';
import { Image, Button, Typography } from 'antd';
import { LuDownload } from "react-icons/lu";
import { BiSolidShareAlt } from "react-icons/bi";
import result from '../../../../public/images/mock/concert.png';
import ShareModal from '../(modals)/shareModal';

const { Paragraph, Text } = Typography;

interface FormData {
    title: string;
    url: string;
}

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storedFormData, setStoredFormData] = useState<FormData | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedFormDataString = sessionStorage.getItem('form_data');
            if (storedFormDataString) {
                setStoredFormData(JSON.parse(storedFormDataString));
            }
        }
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.photoContainer}>
                <Image
                    width={300}
                    height={300}
                    src={result.src}
                    placeholder="미리보기"
                />
            </div>

            <div className={styles.title}>
                {storedFormData?.title || "No title available"}
            </div>
            <div className={styles.shortenUrlContainer}>
                <p>단축 URL: </p><Paragraph copyable style={{margin: '1px'}}>{storedFormData?.url}</Paragraph>
                {/* {storedFormData?.url} */}
            </div>
            <div className={styles.btnContainer}>
                <Button type="primary" icon={<LuDownload />} size="large" className={styles.downloadBtn}>
                    다운로드
                </Button>
                <Button onClick={showModal} type="primary" icon={<BiSolidShareAlt />} size="large" className={styles.shareBtn}>
                    공유하기
                </Button>
            </div>
            <Button
                type="text"
                href="/"
                className={styles.mainBtn}
            >
                메인으로 가기
            </Button>

            {/* Include the ShareModal component */}
            <ShareModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    );
}

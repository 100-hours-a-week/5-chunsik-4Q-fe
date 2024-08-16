"use client";

import styles from './page.module.css';
import { Image, Button, Modal } from 'antd';
import { LuDownload } from "react-icons/lu";
import { BiSolidShareAlt } from "react-icons/bi";
import result from '../../../../public/images/mock/exhibition.png';
import { useState } from "react";
import ShareModal from '../(modals)/shareModal';


export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    width={250}
                    height={370}
                    src={result.src}
                    placeholder="미리보기"
                />
            </div>
            <div className={styles.title}>
                전시회 안내포토
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

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { Image, Button, Typography } from "antd";
import { LuDownload } from "react-icons/lu";
import { getTicketInfo } from "@/service/photo_api";

const { Paragraph } = Typography;

export default function Page() {
  const params = useParams();
  const ticketId = params?.ticketId as string | undefined;
  const [ticketUrl, setTicketUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [shortenUrl, setShortenUrl] = useState<string>("");

  useEffect(() => {
    sessionStorage.removeItem("form_data");
  }, []);

  useEffect(() => {
    if (ticketId) {
      getTicketInfo(Number(ticketId))
        .then((data) => {
          setTicketUrl(data.ticketUrl);
          setTitle(data.title);
          setShortenUrl(data.shortenUrl);
        })
        .catch((error) => {
          console.error("티켓 정보를 가져오는데 실패했습니다:", error);
        });
    }
  }, [ticketId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDownload = async () => {
    if (ticketUrl) {
      try {
        const response = await fetch(ticketUrl, { mode: "cors" });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `photoQR_${title}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download image:", error);
      }
    } else {
      console.error("Image URL is not available for download.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.photoContainer}>
        <Image
          width={300}
          height={300}
          src={ticketUrl}
          placeholder="미리보기"
        />
      </div>

      <div className={styles.title}>{title || "No title available"}</div>
      <div className={styles.shortenUrlContainer}>
        <Paragraph copyable style={{ margin: "1px" }}>
          {shortenUrl || "No URL available"}
        </Paragraph>
      </div>
      <div className={styles.btnContainer}>
        <Button
          type="primary"
          icon={<LuDownload />}
          size="large"
          className={styles.downloadBtn}
          onClick={handleDownload}
        >
          다운로드
        </Button>
      </div>
      <Button type="text" href="/" className={styles.mainBtn}>
        메인으로 가기
      </Button>
    </div>
  );
}

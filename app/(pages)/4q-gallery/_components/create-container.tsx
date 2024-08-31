"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button, Steps, message, theme } from "antd";
import { useRouter } from "next/navigation";
import styles from "./create-container.module.css";
import First from "./first";
import Second from "./second";
import { getShortenUrl } from "../../../../service/shorten_api";

const fetchShortenUrl = async (
  storedFormData: any,
  setStoredFormData: (data: any) => void
) => {
  try {
    const result = await getShortenUrl(storedFormData.url); 

    if (typeof result === "object" && result.shortenUrl && result.shortenUrlId) {
      const existingFormData = JSON.parse(sessionStorage.getItem("form_data") || "{}");

      const updatedFormData = {
        ...existingFormData, 
        shortenUrl: result.shortenUrl, 
        shortenUrlId: result.shortenUrlId, 
      };

      sessionStorage.setItem("form_data", JSON.stringify(updatedFormData)); 
      setStoredFormData(updatedFormData);
    } else {
      console.error("Unexpected result format:", result);
    }
  } catch (error) {
    console.error("Failed to shorten URL:", error);
  }
};

export default function Page() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const formRef = useRef<any>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedFormData, setStoredFormData] = useState<any>(null);

  useEffect(() => {
    const formData = JSON.parse(sessionStorage.getItem("form_data") || "{}");
    setStoredFormData(formData);
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "정보입력",
      content: <First formRef={formRef} onSubmit={next} />,
      buttonText: "입력완료",
    },
    {
      title: "위치선택",
      content: <Second />,
      buttonText: "선택완료",
    },
  ];

  const handleButtonClick = async () => {
    if (current === 0 && formRef.current) {
      if (storedFormData) {
        await fetchShortenUrl(storedFormData, setStoredFormData);
      }
      formRef.current.submit();
    } else if (current === 1) {
      next();
    } else {
      message.success("포큐 생성 완료!");
      router.push("/4q-create/download");
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorPrimary,
    borderRadius: token.borderRadiusLG,
    marginTop: 20,
  };

  return (
    <>
      <div className={styles.container}>
        <Steps current={current} items={items} responsive={false} size="small" />
        <div style={contentStyle} className={styles.contentContainer}>
          {steps[current].content}
        </div>
        <div className={styles.btnContainer}>
          {current === 0 && (
            <Button
              type="primary"
              onClick={handleButtonClick}
              className={styles.nextBtn}
              style={{ height: "40px", width: "140px" }}
            >
              {steps[current].buttonText}
            </Button>
          )}
          {current === 1 && (
            <div className={styles.prevBtnContainer}>
              <Button type="text" onClick={prev} className={styles.prevBtn}>
                이전으로
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

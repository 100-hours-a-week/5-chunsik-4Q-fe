"use client";
export const dynamic = "force-dynamic";
import React, { useRef, useState } from "react";
import { Button, Steps, message, theme, Modal } from "antd";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import First from "./_components/first";
import Second from "./_components/second";
import Third from "./_components/third";

export default function Page() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const formRef = useRef<any>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrent(current - 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const prev = () => {
    showModal();
  };

  const steps = [
    {
      title: "정보입력",
      content: <First formRef={formRef} onSubmit={next} />,
      buttonText: "입력완료",
    },
    {
      title: "배경선택",
      content: <Second />,
      buttonText: "선택완료",
    },
    {
      title: "QR 위치조정",
      content: <Third />,
      buttonText: "4Q 생성",
    },
  ];

  const handleButtonClick = () => {
    if (current === 0 && formRef.current) {
      formRef.current.submit();
    } else if (current === 1) {
      const storedFormData = JSON.parse(
        sessionStorage.getItem("form_data") || "{}"
      );
      const backgroundImageUrl = storedFormData.backgroundImageUrl;

      if (!backgroundImageUrl) {
        message.error("선택된 배경이미지가 없습니다");
      } else {
        next();
      }
    } else if (current < steps.length - 1) {
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
        <Steps
          current={current}
          items={items}
          responsive={false}
          size="small"
        />
        <div style={contentStyle} className={styles.contentContainer}>
          {steps[current].content}
        </div>
        <div className={styles.btnContainer}>
          {current < 2 && (
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
            <Button type="text" onClick={prev} className={styles.prevBtn}>
              이전 단계로
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width={450}
        centered
        footer={
          <div style={{ textAlign: "center" }}>
            <Button key="submit" type="primary" onClick={handleOk}>
              이전 단계로
            </Button>
          </div>
        }
      >
        <div style={{ textAlign: "center" }}>
          <p>뒤로가면 지금까지 생성된 배경이미지가 사라져요.</p>
          <p>그래도 뒤로 가시겠습니까?</p>
        </div>
      </Modal>
    </>
  );
}

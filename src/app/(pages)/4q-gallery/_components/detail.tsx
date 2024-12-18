"use client";

import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { FaArrowLeft } from "react-icons/fa6";
import { Button, Divider } from "antd";
import CreateContainer from "./create-container";
import { PiFolderOpenDuotone, PiCalendarBlankDuotone } from "react-icons/pi";
import { Item } from "@/types/item";

type DetailProps = {
  item: Item;
};

export default function Detail({ item }: DetailProps) {
  const [createStep, setStep] = useState<boolean>(() => {
    return sessionStorage.getItem("createStep") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("createStep", createStep.toString());
  }, [createStep]);

  const generateBtnClick = () => {
    setStep(true);

    const formDataString = sessionStorage.getItem("form_data");
    const formData = formDataString ? JSON.parse(formDataString) : {};

    formData.backgroundImageUrl = item.url;
    formData.backgroundImageId = item.imageId;

    sessionStorage.setItem("form_data", JSON.stringify(formData));
  };

  const handleReset = () => {
    setStep(false);
    sessionStorage.setItem("createStep", "false");
  };

  return (
    <div className={styles.container}>
      {!createStep ? (
        <>
          <div className={styles.detailContainer}>
            <div className={styles.detailTopContainer}>
              <div className={styles.detailInfo}>
              <PiFolderOpenDuotone className={styles.folderIcon}/>
                <p className={styles.title}>{item.categoryName}</p>
              </div>
            </div>
            <div className={styles.imgContainer}>
              <img src={item.url} alt="photo QR" />
            </div>
            <div className={styles.detailBottomContainer}>
              <div className={styles.detailBottomGroup}>
              <PiCalendarBlankDuotone />
                <p>{item.createdAt}</p>
              </div>
            </div>
            <div className={styles.detailTagContainer}>
              {item.tags.map((tag, index) => (
                <div key={index} className={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
            <Button
              className={styles.generateBtn}
              onClick={generateBtnClick}
              size="large"
            >
              이 이미지로 4Q 생성하기
            </Button>
          </div>
          <Divider style={{ width: "450px" }} />
        </>
      ) : (
        <div className={styles.createContainer}>
          <div className={styles.backBtnContainer}>
            <Button
              shape="circle"
              className={styles.backBtn}
              onClick={handleReset}
            >
              <FaArrowLeft />
            </Button>
          </div>
          <CreateContainer />
        </div>
      )}
    </div>
  );
}

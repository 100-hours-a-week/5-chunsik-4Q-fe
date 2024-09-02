"use client";

import React, { useState, useEffect } from "react";
import { Form, Select, Input, Modal, Tooltip } from "antd";
import styles from "./first.module.css";

const { Option } = Select;

const STORAGE_KEY = "form_data";

interface FirstProps {
  formRef: React.RefObject<any>;
  onSubmit: () => void;
}

export default function First({ formRef, onSubmit }: FirstProps) {
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    if (savedData) {
      formRef.current?.setFieldsValue(savedData);
      setValue(savedData.tags || []);
    }
  }, [formRef]);

  const updateSessionStorage = (updatedTags: string[], allValues: any) => {
    // 기존 세션 스토리지에서 데이터를 가져오기
    const existingData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");

    // 새로운 데이터를 기존 데이터와 병합하기
    const dataToSave = {
      ...existingData,
      ...allValues,
      tags: updatedTags,
    };

    // 병합된 데이터를 세션 스토리지에 저장하기
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  const handleFinish = (values: any) => {
    onSubmit();
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateSessionStorage(value, allValues);
  };


  const validateUrl = (_: any, value: string) => {
    if (!value || value.startsWith("http://") || value.startsWith("https://")) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("유효한 URL을 입력해주세요"));
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={handleFinish}
        ref={formRef}
        style={{ maxWidth: 600 }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "제목을 입력해주세요!" }]}
          className={styles.formItem}
        >
          <Input
            placeholder="제목 입력"
            variant="filled"
            className={styles.field}
          />
        </Form.Item>
        <Tooltip title="http:// 또는 https://를 포함해야 합니다">
          <Form.Item
            name="url"
            rules={[
              { required: true, message: "URL을 입력해주세요" },
              { validator: validateUrl },
            ]}
          >
            <Input
              placeholder="URL 입력"
              variant="filled"
              className={styles.field}
            />
          </Form.Item>
        </Tooltip>
      </Form>
    </div>
  );
}

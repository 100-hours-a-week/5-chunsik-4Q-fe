"use client";

import React, { useState } from "react";
import { Form, Input, Tooltip } from "antd";
import styles from "./first.module.css";

const STORAGE_KEY = "form_data";

export default function First({ formRef, onSubmit }: FirstProps) {
  const [value, setValue] = useState<string[]>([]);

  const updateSessionStorage = (updatedTags: string[], allValues: any) => {
    const existingData = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || "{}"
    );

    const dataToSave = {
      ...existingData,
      ...allValues,
    };

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

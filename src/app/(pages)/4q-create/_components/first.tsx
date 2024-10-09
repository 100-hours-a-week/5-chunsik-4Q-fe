"use client";

import React, { useState, useEffect } from "react";
import { Form, Select, Input, Modal, Tooltip } from "antd";
import styles from "./first.module.css";
import TagSelector from "../(modals)/tagSelectModal";
import tagTranslationMap from '@/lib/tagTranslationKrEn'

const { Option } = Select;

const STORAGE_KEY = "form_data";

interface FirstProps {
  formRef: React.RefObject<any>;
  onSubmit: () => void;
}

export default function First({ formRef, onSubmit }: FirstProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    if (savedData) {
      formRef.current?.setFieldsValue(savedData);
      setValue(savedData.tags || []);
    }
  }, [formRef]);

  const updateSessionStorage = (updatedTags: string[], allValues: any) => {
    const dataToSave = {
      ...allValues,
      tags: updatedTags,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  const handleFinish = (values: any) => {
    onSubmit();
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateSessionStorage(value, allValues);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTagSelection = (selectedTags: string[]) => {
    const translatedTags = selectedTags.map(tag => tagTranslationMap[tag] || tag);
    setValue(translatedTags);
    formRef.current?.setFieldsValue({ tags: translatedTags });
    const currentValues = formRef.current?.getFieldsValue();
    updateSessionStorage(translatedTags, currentValues);
    handleCloseModal();
  };

  const handleTagDeselect = (tag: string) => {
    const updatedTags = value.filter((t) => t !== tag);
    setValue(updatedTags);
    formRef.current?.setFieldsValue({ tags: updatedTags });
    const currentValues = formRef.current?.getFieldsValue();
    updateSessionStorage(updatedTags, currentValues);
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
          name="category"
          rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}
        >
          <Select
            placeholder="카테고리 선택"
            variant="filled"
            className={styles.field}
            style={{ height: "50px" }}
          >
            <Option value="메뉴판">메뉴판</Option>
            <Option value="전시회">전시회</Option>
            <Option value="콘서트">콘서트</Option>
            <Option value="출입증">출입증</Option>
            <Option value="청첩장">청첩장</Option>
          </Select>
        </Form.Item>
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
        <Form.Item
          name="tags"
          rules={[
            {
              required: true,
              message: "태그를 최소 한개 이상 선택해주세요.",
            },
          ]}
        >
          <Select
            mode="multiple"
            value={value}
            style={{ width: "100%" }}
            onClick={handleOpenModal}
            onDeselect={handleTagDeselect}
            onChange={(selectedTags) => {
              const translatedTags = selectedTags.map(tag => tagTranslationMap[tag] || tag);
              setValue(translatedTags);
              formRef.current?.setFieldsValue({ tags: translatedTags });
            }}
            variant="filled"
            className={styles.field}
            placeholder="태그를 선택해주세요."
            dropdownRender={() => <></>}
          >
            {value.map((tag) => {
              const koreanTag = Object.keys(tagTranslationMap).find(key => tagTranslationMap[key] === tag) || tag;
              return (
                <Option key={tag} value={tag}>
                  {koreanTag}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>

      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <TagSelector selectedTags={value} onSelect={handleTagSelection} />
      </Modal>
    </div>
  );
}

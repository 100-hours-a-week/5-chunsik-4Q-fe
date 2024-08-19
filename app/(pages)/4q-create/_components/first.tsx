"use client";

import React, {useRef, useState} from 'react';
import { Form, Select, Input, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './first.module.css';
import type { InputRef } from 'antd';
import TagSelector from '../(modals)/tagSelectModal';

const { Option } = Select;

const MAX_COUNT = 3;

interface FirstProps {
    formRef: React.RefObject<any>;
    onSubmit: () => void;  // Callback to handle form submission
}

export default function First({ formRef, onSubmit }: FirstProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState<string[]>([]);
    const inputRef = useRef<InputRef>(null);

    const suffix = (
        <>
            <span>
                {value.length} / {MAX_COUNT}
            </span>
            <DownOutlined />
        </>
    );

    const handleFinish = (values: any) => {
        console.log('Form values:', values);
        onSubmit();  // Trigger the callback to move to the next step
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTagSelection = (selectedTags: string[]) => {
        setValue(selectedTags);
        handleCloseModal();
    };

    const handleTagDeselect = (tag: string) => {
        setValue(value.filter(t => t !== tag));
    };

    return (
        <div className={styles.container}>
            <Form
                onFinish={handleFinish}
                ref={formRef}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name="category"
                    rules={[{ required: true, message: '카테고리를 선택해주세요!' }]}
                >
                    <Select placeholder="카테고리 선택" variant="filled" className={styles.field} style={{ height: '50px' }}>
                        <Option value="메뉴">메뉴</Option>
                        <Option value="전시회">전시회</Option>
                        <Option value="콘서트">콘서트</Option>
                        <Option value="출입증">출입증</Option>
                        <Option value="청첩장">청첩장</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: '제목을 입력해주세요!' }]}
                    className={styles.formItem}
                >
                    <Input placeholder="제목 입력" variant="filled" className={styles.field} />
                </Form.Item>
                <Form.Item
                    name="url"
                    rules={[
                        { required: true, message: 'URL을 입력해주세요!' },
                        { type: 'url', message: '유효한 URL을 입력해주세요!' },
                    ]}
                >
                    <Input placeholder="URL 입력" variant="filled" className={styles.field} />
                </Form.Item>
                <Form.Item>
                    <Select
                        mode="multiple"
                        value={value}
                        style={{ width: '100%' }}
                        onClick={handleOpenModal}
                        onDeselect={handleTagDeselect} // Handle tag deselection
                        suffixIcon={suffix}
                        variant="filled"
                        className={styles.field}
                        placeholder="태그를 선택해주세요."
                        dropdownRender={() => <></>} // Disable the default dropdown
                    >
                        {value.map(tag => (
                            <Option key={tag} value={tag}>
                                {tag}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>

            <Modal
                title=""
                visible={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <TagSelector selectedTags={value} onSelect={handleTagSelection} />
            </Modal>
        </div>
    );
}

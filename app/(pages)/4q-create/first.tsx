import React from 'react';
import { Form, Select, Input } from 'antd';
import styles from './first.module.css';

const { Option } = Select;

interface FirstProps {
    formRef: React.RefObject<any>;
    onSubmit: () => void;  // Callback to handle form submission
}

export default function First({ formRef, onSubmit }: FirstProps) {
    const handleFinish = (values: any) => {
        console.log('Form values:', values);
        onSubmit();  // Trigger the callback to move to the next step
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
                        <Option value="menu">메뉴판</Option>
                        <Option value="invitation">청첩장</Option>
                        <Option value="exhibition">전시회</Option>
                        <Option value="others">기타</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: '제목을 입력해주세요!' }]}
                >
                    <Input placeholder="제목 입력" variant="filled" className={styles.field} />
                </Form.Item>
                <Form.Item
                    name="url"
                    rules={[{ required: true, message: 'URL을 입력해주세요!' }]}
                >
                    <Input placeholder="URL 입력" variant="filled" className={styles.field} />
                </Form.Item>
            </Form>
        </div>
    );
}


{/*<Form.Item>*/}
{/*    <Button type="primary" htmlType="submit">*/}
{/*        생성하기*/}
{/*    </Button>*/}
{/*</Form.Item>*/}
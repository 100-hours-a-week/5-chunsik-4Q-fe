import React from 'react';
import { Form, Select, Input, Button } from 'antd';
import styles from './first.module.css';

const { Option } = Select;

const First: React.FC = () => {
    const handleFinish = (values: any) => {
        console.log('Form values:', values);
    };

    return (
        <div className={styles.container}>
            <Form
                onFinish={handleFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name="category"
                    rules={[{ required: true, message: '카테고리를 선택해주세요!' }]}
                >
                    <Select placeholder="카테고리 선택" variant="filled" className={styles.field} style={{height: '50px'}}>
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
                    <Input placeholder="제목 입력"  variant="filled" className={styles.field} />
                </Form.Item>
                <Form.Item
                    name="url"
                    rules={[{ required: true, message: 'URL을 입력해주세요!' }]}
                >
                    <Input placeholder="URL 입력"  variant="filled" className={styles.field}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        생성하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default First;

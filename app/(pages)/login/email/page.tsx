"use client";

import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import styles from './page.module.css';
import Link from "next/link";
import { login } from "../../../../service/auth_api"
import type { Metadata } from 'next';

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
        const { email, password } = values;
        const result = await login(email!, password!); // Call the login function
        message.success("로그인에 성공했습니다.");
        // Handle success (e.g., navigate to another page, store token, etc.)
        console.log('Login success:', result);
    } catch (error) {
        message.error("로그인에 실패했습니다. 다시 시도해주세요.");
        console.error('Login failed:', error);
    }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Page() {
    return (
        <div className={styles.container}>
            <Form
                name="login"
                style={{ maxWidth: 700, width: '80%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="email"
                    rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
                >
                    <Input variant="filled" placeholder="이메일" className={styles.inputField} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password variant="filled" placeholder="비밀번호" className={styles.inputField} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>로그인 상태 유지</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submitBtn} style={{ height: '50px' }}>
                        로그인
                    </Button>
                </Form.Item>
            </Form>
            <Link href="/signup/email" className={styles.emailLink}>
                이메일로 회원가입
            </Link>
        </div>
    );
}

"use client";

import React from 'react';
import { Button, Checkbox, Form, Input} from 'antd';
import type { FormProps } from 'antd';
import styles from './page.module.css';
import Link from "next/link";
import type { Metadata } from 'next';

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean; // Make sure remember is a boolean since it relates to the checkbox
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
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
                    name="username"
                    rules={[{ required: true, message: '이메일을 입력해주세요.' }]}

                >
                    <Input  variant="filled" placeholder="이메일" className={styles.inputField} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password  variant="filled" placeholder="비밀번호" className={styles.inputField} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>로그인 상태 유지</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submitBtn}  style={{ height: '50px' }} >
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

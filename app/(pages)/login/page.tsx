"use client";

import React from 'react';
import { Button, Checkbox, Form, Input} from 'antd';
import type { FormProps } from 'antd';
import styles from './page.module.css';

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
const LoginForm: React.FC = () => {
    return (
        <Form
            name="login"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}

            >
                <Input  variant="filled" placeholder="Username"  />
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password  variant="filled" placeholder="Password"  />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default function Page() {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
}

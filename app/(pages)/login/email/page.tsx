import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './page.module.css';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//     console.log('성공:', values);
// };

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('실패:', errorInfo);
};

const LoginForm: React.FC = () => (
    <Form
        name="login"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: '사용자 이름을 입력해주세요!' }]}
        >
            <Input placeholder="사용자 이름" />
        </Form.Item>

        <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
        >
            <Input.Password placeholder="비밀번호" />
        </Form.Item>

        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
        >
            <Checkbox>자동 로그인</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                로그인
            </Button>
        </Form.Item>
    </Form>
);

export default function Page() {
    return (
        <div className={styles.container}>
            <h1>로그인</h1>
            <LoginForm />
        </div>
    );
}

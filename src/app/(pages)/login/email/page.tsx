"use client";

import React from 'react';
import { useUserContext } from '@/context/UserContext';
import { Button, Checkbox, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import styles from './page.module.css';
import Link from "next/link";
import { requestLogin, requestUserInfo } from "@/service/auth_api"; 
import { useRouter } from 'next/navigation';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export default function Page() {
  const { login } = useUserContext();  // UserContext의 login 함수 사용
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    const email = values.email ?? "";
    const password = values.password ?? "";

    try {
      const response = await requestLogin(email, password);  // 로그인 요청
      if (response.success) {
        message.success("로그인에 성공했습니다.");

        // 로그인 성공 후 유저 정보 요청
        const userInfo = await requestUserInfo();
        if (userInfo) {
          login(userInfo); 
          router.push('/');
        } else {
          message.error("유저 정보를 가져오는 데 실패했습니다.");
        }
      }
    } catch (error) {
      message.error("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error('Login failed:', error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <Form
        name="login"
        style={{ maxWidth: 700, width: '80%', fontSize: '16px'}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
          style={{ fontSize: '16px'}}
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

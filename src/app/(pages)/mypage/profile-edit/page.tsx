"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { requestProfileUpdate } from "@/service/auth_api";  
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext'

import styles from './page.module.css';
import profileIcon from '../../../../../public/images/icon/profile_icon.svg';

export default function ChangeNicknamePage() {
    const { user, updateUserNickname } = useUserContext();
    const [nickname, setNickname] = useState("");
    const router = useRouter();

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const onFinish = async (values: any) => {
        try {
            const response = await requestProfileUpdate(values.nickname);  
            if (response.success) {
                updateUserNickname(values.nickname);
                message.success("닉네임이 성공적으로 변경되었습니다.");
                router.push('/mypage'); 
            }
        } catch (error: any) {
            message.error(error.message || "닉네임 변경에 실패했습니다.");  
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleGroup}>
                <img src={profileIcon.src} alt="my_4q_icon" className={styles.icon} />
                <span className={styles.title}>닉네임 변경</span>
            </div>
            <p className={styles.subTitle}>변경할 닉네임을 입력해주세요</p>
            <Form
                name="changeNickname"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ width: "100%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}  
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    name="nickname"
                    rules={[
                        { required: true, message: "닉네임을 입력해주세요." },
                        { min:2, max: 10, message: "2~10자 이내로 입력해주세요." },
                    ]}
                >
                    <Input
                        placeholder="1~10자 이내로 입력해주세요"
                        className={styles.inputField}
                        maxLength={10}
                        value={nickname}
                        onChange={handleNicknameChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ height: "50px" }}
                    className={styles.submitBtn}
                >
                    변경하기
                </Button>
            </Form>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Divider, AutoComplete } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { AutoCompleteProps } from "antd";
import styles from "./page.module.css";

const plainOptions = [
    "(필수) 본인은 만 14세 이상입니다",
    "(필수) 서비스 이용약관 동의",
    "(필수) 개인정보 수집 및 이용 동의",
];
const defaultCheckedList = ["(필수) 본인은 만 14세 이상입니다"];

export default function Signup() {
    const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timerCount, setTimerCount] = useState(180);
    const [buttonText, setButtonText] = useState("이메일 인증");
    const [verificationCode, setVerificationCode] = useState("");
    const [verifyButtonColor, setVerifyButtonColor] = useState("");
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const handleSearch = (value: string) => {
        setOptions(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', 'naver.com', 'daum.net', 'nate.com', 'outlook.com'].map((domain) => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        });
    };

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(value));
    };

    const handleEmailVerification = () => {
        if (isEmailValid) {
            setButtonText("이메일 재전송");
            setIsTimerActive(true);
            setTimerCount(180); // Reset timer to 3 minutes
        }
    };

    const handleVerificationCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const code = e.target.value;
        setVerificationCode(code);
        if (/^\d{6}$/.test(code)) {
            setVerifyButtonColor("var(--primary-color)"); // Change button color to primary color if code is 6 digits
        } else {
            setVerifyButtonColor("#e3e3e3"); // Reset color if it's not 6 digits
        }
    };

    useEffect(() => {
        if (isTimerActive && timerCount > 0) {
            const timerId = setInterval(() => {
                setTimerCount((prevCount) => prevCount - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timerCount === 0) {
            setIsTimerActive(false);
        }
    }, [isTimerActive, timerCount]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className={styles.container}>
            <Form
                name="signup"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 700, width: "80%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[{ required: true, message: "이메일을 입력해주세요." }]}
                    className={styles.emailcontainer}
                >
                    <AutoComplete
                        options={options}
                        onSearch={handleSearch}
                        onChange={handleEmailChange}
                        value={email}
                        style={{ width: '100%' }}
                    >
                        <Input
                            placeholder="example@example.com"
                            className={styles.inputField}
                        />
                    </AutoComplete>
                    <button
                        className={styles.emailBtn}
                        style={{
                            backgroundColor: isEmailValid ? "var(--primary-color)" : "",
                            color: isEmailValid ? "white" : "",
                        }}
                        onClick={handleEmailVerification}
                        type="button"
                    >
                        {buttonText}
                    </button>
                </Form.Item>

                <Form.Item
                    name="emailVerification"
                    rules={[{ required: true, message: "이메일 인증 번호를 입력해주세요." }]}
                    className={styles.emailValiContainer}
                >
                    <Input
                        placeholder="인증번호 6자리를 입력해주세요."
                        className={styles.inputField}
                        value={verificationCode}
                        onChange={handleVerificationCodeChange}
                    />
                    {isTimerActive && (
                        <div className={styles.timerContainer}>
                            <span>{formatTime(timerCount)}</span>
                        </div>
                    )}
                    <button
                        className={styles.emailValiBtn}
                        style={{
                            backgroundColor: verifyButtonColor,
                            color: verifyButtonColor === "var(--primary-color)" ? "white" : "",
                        }}
                    >
                        확인
                    </button>
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
                >
                    <Input.Password
                        placeholder="영문/숫자/특수문자 혼합 8~20자"
                        className={styles.inputField}
                    />
                </Form.Item>

                <Form.Item
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    rules={[{ required: true, message: "비밀번호를 한 번 더 입력해주세요." }]}
                >
                    <Input.Password
                        placeholder="비밀번호를 한 번 더 입력해주세요"
                        className={styles.inputField}
                    />
                </Form.Item>

                <Form.Item
                    label="닉네임"
                    name="nickname"
                    rules={[{ required: true, message: "닉네임을 입력해주세요." }]}
                >
                    <Input
                        placeholder="2~16자 이내로 입력해주세요"
                        className={styles.inputField}
                    />
                </Form.Item>

                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                    style={{ margin: "10px 0" }}
                >
                    약관 전체 동의
                </Checkbox>

                <Divider />
                <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
                <Divider />
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ height: "50px" }}
                    className={styles.submitBtn}
                >
                    동의하고 가입하기
                </Button>

                <Form.Item wrapperCol={{ span: 18 }}>
                    <div className={styles.btnContainer}></div>
                </Form.Item>
            </Form>
        </div>
    );
}

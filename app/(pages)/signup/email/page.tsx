"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, message, AutoComplete } from "antd";
import Head from 'next/head';

import styles from "./page.module.css";
import { requestEmailVerification, verifyEmailCode, requestRegister } from "../../../../service/auth_api";
import { useRouter } from 'next/navigation';

// const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "naver.com", "daum.net"];

export default function Signup() {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isBtnDisable, setIsBtnDisable] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timerCount, setTimerCount] = useState(180);
    const [buttonText, setButtonText] = useState("이메일 인증");
    const [valiButtonText, setValiButtonText] = useState("확인");
    const [verificationCode, setVerificationCode] = useState("");
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const router = useRouter();

    const handleEmailChange = (value: string) => {
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(value));

        if (!value.includes("@")) {
            setOptions([]);
        } else {
            const [localPart, domainPart] = value.split("@");
            // const filteredDomains = emailDomains
            //     .filter(domain => domain.startsWith(domainPart))
            //     .map(domain => ({ value: `${localPart}@${domain}` }));
            // setOptions(filteredDomains);
        }
    };

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

    const handleEmailVerification = async () => {
        setIsBtnDisable(true);

        if (isEmailValid) {
            try {
                const successMessage = await requestEmailVerification(email); 
                message.success(successMessage); 
                setButtonText("이메일 재전송");
                setIsBtnDisable(false);
                setIsTimerActive(true);
                setTimerCount(180); 
            } catch (error) {
                message.error(error.message || "이메일 인증 요청에 실패했습니다.");
                setIsBtnDisable(false); // 실패 시 다시 버튼 활성화
            }
        } else {
            message.error("유효한 이메일을 입력해주세요.");
            setIsBtnDisable(false); 
        }
    };

    const handleCodeVerification = async () => {
        if (verificationCode.length === 6) {
            try {
                const result = await verifyEmailCode(email, verificationCode);
                if (result.success) {
                    if (valiButtonText !== "인증 성공") {
                        message.success("이메일 인증이 완료되었습니다.");
                    }
                    setIsTimerActive(false); 
                    setValiButtonText("인증 성공");  
                }
            } catch (error) {
                message.error(error.message || "이메일 인증에 실패했습니다.");
            }
        } else {
            message.error("6자리 인증번호를 입력해주세요.");
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

    const onFinish = async (values: any) => {
        if (valiButtonText !== "인증 성공") {
            message.error("이메일 인증을 해주세요.");
            return;
        }

        try {
            const response = await requestRegister(values.email, values.password, values.nickname);
            if (response.success) {
                message.success("회원가입이 완료되었습니다.");
                router.push('/login/email'); 
            }
        } catch (error) {
            message.error("회원가입에 실패했습니다.");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
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
                <div className={styles.emailFormContainer}>
                    <Form.Item
                        label="이메일"
                        name="email"
                        rules={[{ required: true, message: "이메일을 입력해주세요." }]}
                        className={styles.emailcontainer}
                    >
                        <AutoComplete
                            options={options}
                            onChange={handleEmailChange}
                            onSearch={handleSearch}
                            placeholder="이메일을 입력해주세요."
                            value={email}
                            style={{height: '50px'}}
                            className={styles.inputField}
                        />
                    </Form.Item>
                    <button
                        className={styles.emailBtn}
                        style={{
                            backgroundColor: isBtnDisable ? "#e3e3e3" : "var(--primary-color)",
                            cursor: isBtnDisable ? "not-allowed" : "pointer"
                        }}
                        onClick={handleEmailVerification}
                        type="button"
                        disabled={isBtnDisable}
                    >
                        {buttonText}
                    </button>
                </div>

                <div className={styles.emailFormContainer}>
                    <Form.Item
                        name="emailVerification"
                        rules={[{ required: true, message: "이메일 인증 번호를 입력해주세요." }]}
                        className={styles.emailValiContainer}
                    >
                        <div className={styles.valiContainer}>
                            {isTimerActive && (
                                <span className={styles.timerContainer}>
                                    {formatTime(timerCount)}
                                </span>
                            )}
                            <Input
                                placeholder="인증번호 6자리를 입력해주세요."
                                maxLength={6}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                    </Form.Item>
                    <button
                        className={styles.emailValiBtn}
                        style={{
                            cursor: valiButtonText === "인증 성공" ? "not-allowed" : "pointer"
                        }}
                        onClick={handleCodeVerification}
                        type="button"
                    >
                        {valiButtonText}
                    </button>
                </div>
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
                        maxLength={16}
                    />
                </Form.Item>

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

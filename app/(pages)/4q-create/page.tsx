"use client"

import React, { useRef, useState } from 'react';
import { Button, Steps, message, theme } from 'antd';
import styles from './page.module.css';
import First from './first';
import Second from "./second";

export default function Page() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const formRef = useRef<any>(null);

    // Define the next function first
    const next = () => {
        setCurrent(current + 1);
    };

    // Define the steps array after declaring the next function
    const steps = [
        {
            title: '정보입력',
            content: <First formRef={formRef} onSubmit={next} />,
            buttonText: '입력완료',
        },
        {
            title: '배경선택',
            content: <Second />,
            buttonText: '선택완료',
        },
        {
            title: 'QR 위치조정',
            content: 'Last-content',
            buttonText: '4Q 생성',
        },
    ];

    const onChange = (value: number) => {
        setCurrent(value);
    };

    const handleButtonClick = () => {
        if (current === 0 && formRef.current) {
            formRef.current.submit();
        } else if (current < steps.length - 1) {
            next();
        } else {
            message.success('Processing complete!');
        }
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: '550px',
        textAlign: 'center',
        color: token.colorPrimary,
        borderRadius: token.borderRadiusLG,
        marginTop: 20,
    };

    return (
        <div className={styles.container}>
            <Steps
                current={current}
                onChange={onChange}
                items={items}
                responsive={false}
                size='small'
                className={styles.steps}
            />
            <div style={contentStyle} className={styles.contentContainer}>
                {steps[current].content}
            </div>
            <div className={styles.btnContainer}>
                <Button
                    type="primary"
                    onClick={handleButtonClick}
                    className={styles.rightBtn}
                >
                    {steps[current].buttonText}
                </Button>
            </div>
        </div>
    );
}

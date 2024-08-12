"use client"

import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import styles from './page.module.css'
import First from './first'

const steps = [
    {
        title: '정보입력',
        content: <First />,
    },
    {
        title: '배경선택',
        content: 'Second-content',
    },
    {
        title: 'QR 위치조정',
        content: 'Last-content',
    },
];



export default function Page() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    const contentStyle: React.CSSProperties = {
        lineHeight: '550px',
        textAlign: 'center',
        // backgroundColor: 'black',
        color: token.colorPrimary,
        // backgroundColor: token.colorPrimary,
        borderRadius: token.borderRadiusLG,
        // border: `1px dashed ${token.colorPrimary}`,
        marginTop: 50,
    };


    return (
        <div className={styles.container}>
            <Steps current={current} items={items} responsive={false} size='small' className={styles.steps}/>
            <div style={contentStyle}>{steps[current].content}</div>
            <div className={styles.btnContainer}>
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()} className={styles.leftBtn}>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()} className={styles.rightBtn}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')} className={styles.rightBtn}>
                        Done
                    </Button>
                )}
            </div>
        </div>
    );
};
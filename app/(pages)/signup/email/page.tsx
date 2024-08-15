"use client"

import { useState } from 'react';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './page.module.css';

const plainOptions = ['(필수) 본인은 만 14세 이상입니다', '(필수) 서비스 이용약관 동의', '(필수) 개인정보 수집 및 이용 동의'];
const defaultCheckedList = ['(필수) 본인은 만 14세 이상입니다'];

const SignupForm: React.FC = () => {
    const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.container}>
            <Form
                name="signup"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                style={{maxWidth: 700, width: '80%'}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical" // input 위에 label이 위치하도록 설정
            >

                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[{required: true, message: '이메일을 입력해주세요.'}]}
                >
                    <Input placeholder="example@example.com" className={styles.inputField}/>
                </Form.Item>


                <div className={styles.emailValidationContainer}>
                    <Form.Item
                        // label="이메일 인증번호"
                        name="emailVerification"
                        rules={[{required: true, message: '이메일 인증 번호를 입력해주세요.'}]}
                    >
                        <Input placeholder="이메일 인증 번호를 입력해주세요." className={styles.inputField}/>
                    </Form.Item>
                    <Button type="default" style={{marginLeft: '10px', height: '50px'}}>
                        이메일 인증하기
                    </Button>
                </div>


                    <Form.Item
                        label="비밀번호"
                        name="password"
                        rules={[{required: true, message: '비밀번호를 입력해주세요.'}]}
                    >
                        <Input.Password placeholder="영문/숫자/특수문자 혼합 8~20자" className={styles.inputField}/>
                    </Form.Item>

                    <Form.Item
                        label="비밀번호 확인"
                        name="passwordConfirm"
                        rules={[{required: true, message: '비밀번호를 한 번 더 입력해주세요.'}]}
                    >
                        <Input.Password placeholder="비밀번호를 한 번 더 입력해주세요" className={styles.inputField}/>
                    </Form.Item>

                    <Form.Item
                        label="닉네임"
                        name="nickname"
                        rules={[{required: true, message: '닉네임을 입력해주세요.'}]}
                    >
                        <Input placeholder="2~16자 이내로 입력해주세요" className={styles.inputField}/>
                    </Form.Item>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                        style={{margin: '10px 0'}}
                    >
                        약관 전체 동의
                    </Checkbox>

                    <Divider/>
                    <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange}/>
                    <Divider/>

                    <Form.Item wrapperCol={{span: 18}}>
                        <div className={styles.btnContainer}>
                        <Button type="primary" htmlType="submit" style={{height: '50px'}} className={styles.submitBtn}>
                            동의하고 가입하기
                        </Button>
                        </div>
                    </Form.Item>
            </Form>
        </div>
);
};

export default SignupForm;

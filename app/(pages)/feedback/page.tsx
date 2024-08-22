"use client";

import { useState } from 'react';
import styles from './page.module.css';
import {
  FaRegFaceAngry,
  FaRegFaceFrown,
  FaRegFaceMeh,
  FaRegFaceSmile,
  FaRegFaceKissWinkHeart,
} from "react-icons/fa6";
import {
  Rate,
  Input,
  Button,
  Modal,
  Result,
  Form,
  Select,
  Radio,
  message,
} from 'antd';
import Link from "next/link";
import { feedbackSubmit } from "../../../service/feedback_api";

const { TextArea } = Input;
const { Option } = Select;

const modalSubTitle = (
  <p>
    시간을 내어 의견을 보내주셔서 감사합니다. <br /> 더 나은 4Q 개선을 위해 최선을 다하겠습니다.
  </p>
);

const customIcons: Record<number, React.ReactNode> = {
  1: <FaRegFaceAngry />,
  2: <FaRegFaceFrown />,
  3: <FaRegFaceMeh />,
  4: <FaRegFaceSmile />,
  5: <FaRegFaceKissWinkHeart />,
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    const feedbackData = {
      starRate: parseInt(values.starRate),
      comment: values.comment,
      ease: parseInt(values.ease),
      design: parseInt(values.design),
      performance: parseInt(values.performance),
      feature: Boolean(values.feature), 
      recommendation: Boolean(values.recommendation), 
      reuse: Boolean(values.reuse), 
      gender: values.gender,
      ageGroup: parseInt(values.ageGroup),
    };

    console.log('Submitting feedback:', JSON.stringify(feedbackData, null, 2));

    try {
      const response = await feedbackSubmit(feedbackData);
      if(response.success) {
        showModal();
      } else {
        message.error("피드백 작성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('Failed to submit feedback: ', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          4Q 서비스 이용에 얼마나 만족하셨나요?
        </div>
        <Form
          name="feedback_form"
          onFinish={onSubmit}
          initialValues={{
            starRate: "",
            ease: "",
            design: "",
            performance: "",
            feature: "",
            recommendation: "",
            reuse: "",
            ageGroup: "",
            gender: "",
            comment: "",
          }}
          style={{ marginTop: 20, width: '80%' }}
        >
          <Form.Item
            name="starRate"
            label="별점을 선택해주세요"
            initialValue={3}
          >
            <Rate
              character={({ index = 0 }) => customIcons[index + 1]}
              style={{ fontSize: 34 }}
            />
          </Form.Item>

          <Form.Item
            name="ease"
            label="제품 사용이 얼마나 쉬웠나요?"
          >
            <Select placeholder="선택해 주세요">
              <Option value="5">매우 쉬웠다</Option>
              <Option value="4">쉬웠다</Option>
              <Option value="3">보통이다</Option>
              <Option value="2">어려웠다</Option>
              <Option value="1">매우 어려웠다</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="design"
            label="제품의 디자인은 얼마나 만족스러웠나요?"
          >
            <Select placeholder="선택해 주세요">
              <Option value="5">매우 만족</Option>
              <Option value="4">만족</Option>
              <Option value="3">보통</Option>
              <Option value="2">불만족</Option>
              <Option value="1">매우 불만족</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="performance"
            label="성능에 대한 만족도는 어떠셨나요?"
          >
            <Select placeholder="선택해 주세요">
              <Option value="5">매우 만족</Option>
              <Option value="4">만족</Option>
              <Option value="3">보통</Option>
              <Option value="2">불만족</Option>
              <Option value="1">매우 불만족</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="feature"
            label="기능들이 제대로 작동했나요?"
          >
            <Radio.Group>
            <Radio.Button value={true}>네</Radio.Button>
              <Radio.Button value={false}>아니요</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="recommendation"
            label="이 제품을 다른 사람에게 추천하시겠습니까?"
          >
            <Radio.Group>
              <Radio.Button value={true}>네</Radio.Button>
              <Radio.Button value={false}>아니요</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="reuse"
            label="향후 이 제품을 계속 사용하실 의향이 있으신가요?"
          >
            <Radio.Group>
            <Radio.Button value={true}>네</Radio.Button>
              <Radio.Button value={false}>아니요</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="ageGroup"
            label="나이대"
          >
            <Select placeholder="선택해 주세요">
              <Option value="20">20대</Option>
              <Option value="30">30대</Option>
              <Option value="40">40대</Option>
              <Option value="50">50대</Option>
              <Option value="60">60대</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="성별"
          >
            <Radio.Group>
              <Radio value="MALE">남성</Radio>
              <Radio value="FEMALE">여성</Radio>
            </Radio.Group>
          </Form.Item>
          <div className={styles.label}>
            추가로 하고 싶은 말씀이 있으신가요?
            </div>
          <Form.Item
            name="comment"
            // label=""
          >
            <TextArea
              showCount
              maxLength={200}
              placeholder="추가 의견을 작성해주세요"
              style={{ height: 120, width: '100%', resize: 'none', marginTop: '10px' }}
            />
          </Form.Item>

          <div className={styles.btnContainer}>
            <Button type="primary" htmlType="submit">
              제출하기
            </Button>
            <Button htmlType="reset" style={{ marginLeft: '10px' }}>초기화</Button>
          </div>
        </Form>
        <Link href="/" className={styles.navigateHome}>
          홈으로 이동
        </Link>
      </div>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Result
          status="success"
          title="피드백이 성공적으로 제출되었습니다!"
          subTitle={modalSubTitle}
          extra={[
            <Link href="/" className={styles.homeBtn}>홈으로 이동</Link>
          ]}
        />
      </Modal>
    </>
  );
}

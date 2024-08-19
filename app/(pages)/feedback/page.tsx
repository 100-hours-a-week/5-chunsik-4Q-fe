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
  Space,
} from 'antd';
import Link from "next/link";

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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    showModal();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          4Q 서비스 이용에 얼마나 만족하셨나요?
        </div>
        <div className={styles.rateForm}>
          <Rate
            defaultValue={3}
            character={({ index = 0 }) => customIcons[index + 1]}
            style={{ fontSize: 34 }}
          />
          <div className={styles.rateText}>
            <div className={styles.rateScore}>
              매우 불만족
            </div>
            <div className={styles.rateScore}>
              매우 만족
            </div>
          </div>
        </div>
        <Form
          name="feedback_form"
          onFinish={onFinish}
          initialValues={{
            frequency: "하루에 한 번",
            easeOfUse: "보통이다",
            designSatisfaction: "보통",
            performanceSatisfaction: "보통",
            functionProperly: "네",
            recommend: "네",
            continueUse: "네",
            ageGroup: "20대",
            gender: "남성",
          }}
          style={{ marginTop: 20, width: '80%' }}
        >

          <Form.Item
            name="easeOfUse"
            label="제품 사용이 얼마나 쉬웠나요?"
          >
            <Select placeholder="선택해 주세요">
              <Option value="매우 쉬웠다">매우 쉬웠다</Option>
              <Option value="쉬웠다">쉬웠다</Option>
              <Option value="보통이다">보통이다</Option>
              <Option value="어려웠다">어려웠다</Option>
              <Option value="매우 어려웠다">매우 어려웠다</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="designSatisfaction"
            label="제품의 디자인은 얼마나 만족스러웠나요?"
          >
            <Select placeholder="선택해 주세요">
              <Option value="매우 만족">매우 만족</Option>
              <Option value="만족">만족</Option>
              <Option value="보통">보통</Option>
              <Option value="불만족">불만족</Option>
              <Option value="매우 불만족">매우 불만족</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="performanceSatisfaction"
            label="성능에 대한 만족도는 어떠셨나요?"
          >
            <Select placeholder="선택해 주세요">
              <Option value="매우 만족">매우 만족</Option>
              <Option value="만족">만족</Option>
              <Option value="보통">보통</Option>
              <Option value="불만족">불만족</Option>
              <Option value="매우 불만족">매우 불만족</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="functionProperly"
            label="기능들이 제대로 작동했나요?"
          >
            <Radio.Group>
              <Radio.Button value="네">네</Radio.Button>
              <Radio.Button value="아니요">아니요</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="recommend"
            label="이 제품을 다른 사람에게 추천하시겠습니까?"
          >
            <Radio.Group>
              <Radio.Button value="네">네</Radio.Button>
              <Radio.Button value="아니요">아니요</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="continueUse"
            label="향후 이 제품을 계속 사용하실 의향이 있으신가요?"
          >
            <Radio.Group>
              <Radio.Button value="네">네</Radio.Button>
              <Radio.Button value="아니요">아니요</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="ageGroup"
            label="나이대"
          >
            <Select placeholder="선택해 주세요">
              <Option value="20대">20대</Option>
              <Option value="30대">30대</Option>
              <Option value="40대">40대</Option>
              <Option value="50대">50대</Option>
              <Option value="60대">60대</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="성별"
          >
            <Radio.Group>
              <Radio value="남성">남성</Radio>
              <Radio value="여성">여성</Radio>
            </Radio.Group>
            <TextArea
          showCount
          maxLength={200}
          placeholder="추가로 하고 싶은 말씀이 있으신가요?"
          style={{ height: 120, width: '100%', resize: 'none', marginTop: '10px' }}
        />
          </Form.Item>

          <Form.Item >
            <Space>
              <Button type="primary" htmlType="submit">
                제출하기
              </Button>
              <Button htmlType="reset">초기화</Button>
            </Space>
          </Form.Item>
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

import styles from "./shareModal.module.css";
import { Modal, Button, Typography, message } from "antd";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { InstagramOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

export default function ShareModal({ isModalOpen, handleOk, handleCancel }) {
  const showMessage = () => {
    message.info("공유 기능은 준비중입니다 ><");
  };

  return (
    <Modal
      title="공유하기"
      style={{ top: 180 }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={styles.container}>
        <div className={styles.shareItemContainer}>
          <div className={styles.shareItem}>
            <Button
              className={styles.shareItemIcon}
              size="large"
              shape="circle"
              style={{ backgroundColor: "#EFFBF3" }}
              onClick={showMessage}
            >
              <AiOutlineMessage />
            </Button>
            메시지
          </div>
          <div className={styles.shareItem}>
            <Button
              className={styles.shareItemIcon}
              size="large"
              shape="circle"
              style={{ backgroundColor: "#FFF8C3" }}
              onClick={showMessage}
            >
              <RiKakaoTalkFill style={{ fontSize: "20px" }} />
            </Button>
            카카오톡
          </div>
          <div className={styles.shareItem}>
            <Button
              className={styles.shareItemIcon}
              size="large"
              shape="circle"
              style={{ backgroundColor: "#fce5ed" }}
              onClick={showMessage}
            >
              <InstagramOutlined />
            </Button>
            인스타
          </div>
          <div className={styles.shareItem}>
            <Button
              className={styles.shareItemIcon}
              size="large"
              shape="circle"
              style={{ backgroundColor: "#ECF6FD" }}
              onClick={showMessage}
            >
              <MdOutlineAlternateEmail />
            </Button>
            이메일
          </div>
        </div>
      </div>
    </Modal>
  );
}

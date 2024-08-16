import styles from './shareModal.module.css';
import {Modal, Button, Typography} from "antd";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import {InstagramOutlined} from "@ant-design/icons";

const { Paragraph } = Typography;


export default function ShareModal({ isModalOpen, handleOk, handleCancel }) {
    return (
        <Modal
            title="공유하기"
            // centered
            style={{top: 180}}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <div className={styles.container}>
                <div className={styles.shareItemContainer}>
                    <div className={styles.shareItem}>
                        <Button className={styles.shareItemIcon} size="large" shape="circle"
                                style={{backgroundColor: '#EFFBF3'}}>
                            <AiOutlineMessage/>
                        </Button>
                        메시지
                    </div>
                    <div className={styles.shareItem}>
                        <Button className={styles.shareItemIcon} size="large" shape="circle"
                                style={{backgroundColor: '#FFF8C3'}}>
                            <RiKakaoTalkFill style={{fontSize: '20px'}}/>
                        </Button>
                        카카오톡
                    </div>
                    <div className={styles.shareItem}>
                        <Button className={styles.shareItemIcon} size="large" shape="circle"
                                style={{backgroundColor: '#fce5ed'}}>
                            <InstagramOutlined/>
                        </Button>
                        인스타
                    </div>
                    <div className={styles.shareItem}>
                        <Button className={styles.shareItemIcon} size="large" shape="circle"
                                style={{backgroundColor: '#ECF6FD'}}>
                            <MdOutlineAlternateEmail/>
                        </Button>
                        이메일
                    </div>
                </div>

            </div>
            <div className={styles.urlCopyContainer}>
                <div className={styles.urlCopyTitle}>
                    링크 공유
                </div>
                <div className={styles.urlCopy}>
                    <Paragraph
                        copyable={{
                            tooltips: ['링크 복사하기', '링크가 복사되었습니다!'],
                        }}
                        // style={{marginTop: '4px'}}
                    >www.qqqq.world</Paragraph>
                </div>


            </div>
        </Modal>
    );
}

import styles from "./item-list.module.css";
import { deleteTicket } from "@/service/photo_api";
import { List, Button, Tag, message, Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { IoIosCalendar } from "react-icons/io";
import { RxClipboardCopy } from "react-icons/rx";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";

const handleDownload = async (item) => {
  if (item.ticketUrl) {
    try {
      const response = await fetch(item.ticketUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `photoQR_${item.title}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  } else {
    console.error("Image URL is not available for download.");
  }
};

const handleCopyToClipboard = (item) => {
  if (item.ticketUrl) {
    navigator.clipboard.writeText(item.ticketUrl).then(() => {
      message.success("이미지 링크가 복사되었습니다.");
    });
  }
};

// ListItem Component
const ItemList = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await deleteTicket(item.id);
      message.success("티켓이 삭제되었습니다.");
      setIsModalOpen(false);
    } catch (error) {
      message.error("티켓 삭제에 실패했습니다.");
      console.error(error);
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <List.Item key={item.title}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.imgContainer}>
            <img
              width={150}
              height={150}
              alt="my 4q tickets"
              src={item.ticketUrl}
              style={{ backgroundColor: "grey" }}
            />
          </div>
          <span className={styles.title}>{item.title}</span>
        </div>
        <div className={styles.infoConatiner}>
          <div className={styles.categoryGroup}>
            <Tag>{item.categoryName}</Tag>
          </div>
          <div className={styles.dateGroup}>
            <IoIosCalendar />
            <span>{item.formattedDate}</span>
          </div>
          <div className={styles.BtnContainer}>
            <Button
              type="primary"
              icon={<RxClipboardCopy />}
              onClick={() => handleCopyToClipboard(item)}
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(item)}
              className={styles.downloadButton}
            />
            <Button
              type="primary"
              icon={<HiOutlineTrash />}
              onClick={showDeleteModal}
              className={styles.deleteButton}
            />
          </div>
        </div>
      </div>
      <Modal
        title="티켓 삭제 확인"
        style={{ maxWidth: "600px" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="삭제"
        cancelText="취소"
      >
        <p>정말로 티켓을 삭제하시겠습니까?</p>
      </Modal>
    </List.Item>
  );
};

export default ItemList;

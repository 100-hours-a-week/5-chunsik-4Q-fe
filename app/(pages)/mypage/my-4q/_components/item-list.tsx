import styles from './item-list.module.css'
import { List } from 'antd';
import { IoIosCalendar } from "react-icons/io";



// ListItem Component
const ItemList = ({ item }) => (
    <List.Item
        key={item.title}
    >
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.imgContainer}>
                    <img
                        width={150}
                        height={150}
                        alt="logo"
                        src={item.ticketUrl}
                        style={{backgroundColor: 'grey'}}
                    />
                </div>
                <span className={styles.title}>{item.title}</span>
            </div>
            <div className={styles.infoConatiner}>
                <div className={styles.categoryGroup}>
                    <span>{item.categoryName}</span>
                </div>
                <div className={styles.dateGroup}>
                    <IoIosCalendar />
                    <span>{item.formattedDate}</span>
                </div>
            </div>
        </div>
    </List.Item>
);

export default ItemList;

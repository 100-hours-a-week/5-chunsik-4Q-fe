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
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtyN6_7UgeHDDEinAuuo0ROVtQp1lUXsqDW4fp5BOJ-7gt7D0S1Ugzq7ENEv2-nfq-km4&usqp=CAU"
                    />
                </div>
                <span className={styles.title}>{item.title}</span>
            </div>
            <div className={styles.infoConatiner}>
                <div className={styles.categoryGroup}>
                    <span>{item.category}</span>
                </div>
                <div className={styles.dateGroup}>
                    <IoIosCalendar />
                    <span>{item.createdAt}</span>
                </div>
            </div>
        </div>
    </List.Item>
);

export default ItemList;

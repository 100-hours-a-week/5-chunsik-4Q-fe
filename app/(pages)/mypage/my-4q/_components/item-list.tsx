import styles from './item-list.module.css'
import { List } from 'antd';
import { IoIosCalendar } from "react-icons/io";



// ListItem Component
const ItemList = ({ item }) => (
    <List.Item
        key={item.title}
    // extra={
    //   <img
    //     width={272}
    //     alt="logo"
    //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
    //   />
    // }
    >
        {/* <List.Item.Meta
      title={<a href={item.href}>{item.title}</a>}
    /> */}
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.imgContainer}>
                    <img
                        width={160}
                        height={160}
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

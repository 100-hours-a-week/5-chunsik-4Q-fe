import styles from './container.module.css';
import Item from './item';

export default function Container() {
    return (
        <div className={styles.container}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </div>
    );
}

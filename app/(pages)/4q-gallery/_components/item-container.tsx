import styles from './item-container.module.css';
import ItemCard from './item-card';

export default function Container() {
    const items = [
        {
            "createdAt": "2024/08/27",
            "imageId": 1,
            "likeCount": 10,
            "userName": "chen",
            "categoryName": "전시회",
            "url": "https://dnpn8qxgya4tw.cloudfront.net/img/goods/202151/1640338945_2.jpg",
            "tags": ["밝은", "꽃"]
        },
        {
            "createdAt": "2024/08/30",
            "imageId": 2,
            "likeCount": 30,
            "userName": "silvia",
            "categoryName": "메뉴판",
            "url": "https://static.wtable.co.kr/image/production/service/kitchenguidecontent/62866/03902fab-736c-4d88-a543-0aa57c2b5310.jpg",
            "tags": ["봄", "어두운"]
        },
        {
            "createdAt": "2024/09/03",
            "imageId": 3,
            "likeCount": 123,
            "userName": "carter",
            "categoryName": "메뉴판",
            "url": "https://img.lush.co.kr/product/ingredients/avocado_1000.jpg",
            "tags": ["봄", "어두운"]
        },

    ]

    return (
        <div className={styles.container}>
            {items.map( (item) => (
                <ItemCard key={item.imageId} item={item}/>
                ))}
        </div>
    );
}

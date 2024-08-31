import styles from './item-container.module.css';
import ItemCard from './item-card';

type Item = {
    createdAt: string;
    imageId: number;
    likeCount: number;
    userName: string;
    categoryName: string;
    url: string;
    tags: string[];
};

type ContainerProps = {
    category: string;
    tag: string;
    sort: string;
};

const items: Item[] = [
    {
        createdAt: "2024/08/27",
        imageId: 1,
        likeCount: 200,
        userName: "chen",
        categoryName: "전시회",
        url: "https://dnpn8qxgya4tw.cloudfront.net/img/goods/202151/1640338945_2.jpg",
        tags: ["밝은", "꽃"]
    },
    {
        createdAt: "2024/08/30",
        imageId: 2,
        likeCount: 30,
        userName: "silvia",
        categoryName: "메뉴판",
        url: "https://static.wtable.co.kr/image/production/service/kitchenguidecontent/62866/03902fab-736c-4d88-a543-0aa57c2b5310.jpg",
        tags: ["봄", "어두운"]
    },
    {
        createdAt: "2024/09/03",
        imageId: 3,
        likeCount: 123,
        userName: "carter",
        categoryName: "메뉴판",
        url: "https://img.lush.co.kr/product/ingredients/avocado_1000.jpg",
        tags: ["겨울", "레드"]
    },
];

export default function Container({ category, tag, sort }: ContainerProps) {
    // Filter items based on category and tag
    const filteredItems = items.filter((item) => {
        const matchesCategory = category === 'all' || item.categoryName === category;
        const matchesTag = !tag || item.tags.includes(tag);
        return matchesCategory && matchesTag;
    });

    // Sort items based on sort value
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sort === 'latest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sort === 'popular') {
            return b.likeCount - a.likeCount;
        }
        return 0;
    });

    return (
        <div className={styles.container}>
            {sortedItems.map((item) => (
                <ItemCard key={item.imageId} item={item} />
            ))}
        </div>
    );
}

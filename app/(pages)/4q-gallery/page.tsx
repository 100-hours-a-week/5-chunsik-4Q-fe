"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./page.module.css";
import { Select } from "antd";
import { LuListFilter } from "react-icons/lu";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "all", name: "전체" },
  { id: "menu", name: "메뉴판" },
  { id: "exhibition", name: "전시회" },
  { id: "concert", name: "콘서트" },
  { id: "entrance", name: "출입증" },
  { id: "wedding", name: "청첩장" },
];

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams({ category: categoryId });
    router.push(`${pathname}?${params.toString()}`);
  };

  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

    return (
      <div
        className={`${styles.arrow} ${isFirstItemVisible ? styles.disabled : ""}`}
        onClick={() => scrollPrev()}
      >
        <IoIosArrowBack />
      </div>
    );
  };

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <div
        className={`${styles.arrow} ${isLastItemVisible ? styles.disabled : ""}`}
        onClick={() => scrollNext()}
      >
        <IoIosArrowForward />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Select
          defaultValue="최신순"
          style={{ width: 120 }}
          className={styles.selectBox}
          options={[
            { value: "최신순", label: "최신순" },
            { value: "인기순", label: "인기순" },
          ]}
        />
        <div className={styles.filterBtn}>
          <LuListFilter className={styles.filterIcon} />
          <span>검색</span>
        </div>
        
      </div>
      
      <div className={styles.categoryContainer}>
      <hr />
        <ScrollMenu  LeftArrow={LeftArrow} RightArrow={RightArrow} itemClassName={styles.scrollMenu}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${styles.categoryItem} ${
                selectedCategory === category.id ? styles.selectedCategory : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
}

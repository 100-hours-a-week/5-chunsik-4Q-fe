"use client";

import React, { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { Select, Input, Modal } from "antd";
import type { GetProps } from "antd";
import { LuListFilter } from "react-icons/lu";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import TagSelector from "../4q-create/(modals)/tagSelectModal";
import tagTranslationMap from "../../../lib/tagTranslationKrEn";
import Container from "./_components/container";

type SearchProps = GetProps<typeof Input.Search>;

type Category = {
  id: string;
  name: string;
};

const { Search } = Input;

const categories: Category[] = [
  { id: "all", name: "전체" },
  { id: "menu", name: "메뉴판" },
  { id: "exhibition", name: "전시회" },
  { id: "concert", name: "콘서트" },
  { id: "entrance", name: "출입증" },
  { id: "wedding", name: "청첩장" },
];

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchContainerVisible, setIsSearchContainerVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // createQueryString 함수 정의
  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name); // 값이 없으면 해당 파라미터를 삭제
      }

      return params.toString();
    },
    [searchParams]
  );

  // 태그 검색시 쿼리 파라미터로 전송
  const onSearch: SearchProps["onSearch"] = (value) => {
    const newQueryString = createQueryString("tag", value);
    router.push(`${pathname}?${newQueryString}`);
    console.log(value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterBtnClick = () => {
    setIsSearchContainerVisible(!isSearchContainerVisible);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newQueryString = createQueryString("category", categoryId);
    router.push(`${pathname}?${newQueryString}`);
  };

  // sort 값 변경 시 쿼리 파라미터 업데이트
  const handleSortChange = (value: string) => {
    const sortValue = value === "최신순" ? "latest" : "popular"; // 최신순 또는 인기순에 따라 sort 파라미터 값 결정
    const newQueryString = createQueryString("sort", sortValue);
    router.push(`${pathname}?${newQueryString}`);
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
          onChange={handleSortChange} // onChange 이벤트 핸들러 추가
          options={[
            { value: "최신순", label: "최신순" },
            { value: "인기순", label: "인기순" },
          ]}
        />
        <div className={styles.filterBtn} onClick={handleFilterBtnClick}>
          <LuListFilter className={styles.filterIcon} />
          <span>검색</span>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <hr />
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} itemClassName={styles.scrollMenu}>
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
      <div className={`${styles.searchContainer} ${isSearchContainerVisible ? styles.visible : ""}`}>
        <div className={styles.searchFieldContainer}>
          <p>태그 검색</p>
          <Search size="large" placeholder="" onSearch={onSearch} style={{ width: "100%" }} />
        </div>
      </div>
      <Container />
    </div>
  );
}

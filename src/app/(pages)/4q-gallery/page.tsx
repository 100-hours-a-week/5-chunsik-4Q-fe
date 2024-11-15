// page.tsx
"use client";
export const dynamic = "force-dynamic";
import React, { useState, useCallback, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { Select, Input } from "antd";
import type { GetProps } from "antd";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";
import Container from "./_components/item-container";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { categories } from "./_lib/categories";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

function SearchParamsHandler({
  isSearchContainerVisible,
  setIsSearchContainerVisible,
}: {
  isSearchContainerVisible: boolean;
  setIsSearchContainerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryParam = searchParams?.get("category") || "all";
  const tagParam = searchParams?.get("tag") || "";
  const sortParam = searchParams?.get("sort") || "latest";

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(
        searchParams ? searchParams.toString() : ""
      );

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newQueryString = createQueryString(
      "category",
      categoryId !== "all" ? categoryId : undefined
    );
    router.push(`${pathname}?${newQueryString}`);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    const newQueryString = createQueryString(
      "tag",
      value.trim() ? value : undefined
    );
    router.push(`${pathname}?${newQueryString}`);
  };

  const handleFilterBtnClick = () => {
    setIsSearchContainerVisible((prev) => !prev);
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <Select
            defaultValue="최신순"
            style={{ width: 120 }}
            className={styles.selectBox}
            onChange={(value) => {
              const sortValue = value === "최신순" ? "latest" : "popular";
              const newQueryString = createQueryString("sort", sortValue);
              router.push(`${pathname}?${newQueryString}`);
            }}
            options={[
              { value: "최신순", label: "최신순" },
              { value: "인기순", label: "인기순" },
            ]}
          />
          <div className={styles.filterBtn} onClick={handleFilterBtnClick}>
            {tagParam ? (
              <div className={styles.numberSearch}>1</div>
            ) : (
              <IoIosSearch className={styles.filterIcon} />
            )}
            <span>검색</span>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <hr />
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            itemClassName={styles.scrollMenu}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategory === category.id
                    ? styles.selectedCategory
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </ScrollMenu>
        </div>
        <div
          className={`${styles.searchContainer} ${
            isSearchContainerVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.searchFieldContainer}>
            <p>태그 검색</p>
            <Search
              size="large"
              placeholder=""
              allowClear
              onSearch={onSearch}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <Suspense>
          <Container category={categoryParam} tag={tagParam} sort={sortParam} />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default function Page() {
  const [isSearchContainerVisible, setIsSearchContainerVisible] =
    useState(false);

  return (
      <SearchParamsHandler
        isSearchContainerVisible={isSearchContainerVisible}
        setIsSearchContainerVisible={setIsSearchContainerVisible}
      />
  );
}

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

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

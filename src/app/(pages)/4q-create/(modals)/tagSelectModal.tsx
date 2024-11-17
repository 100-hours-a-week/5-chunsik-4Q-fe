import React, { useState, useEffect } from "react";
import { Button, Alert } from "antd";
import styles from "./tagSelectModal.module.css";
import hot_mark from "../../../../../public/images/hot_tag.png";
import tagTranslationMap from "@/lib/tagTranslationKrEn";
import { moodTags, colorTags, seasonTags, hotTags } from './_lib/tags'

interface TagSelectorProps {
  selectedTags: string[];
  onSelect: (selectedTags: string[]) => void;
}

export default function TagSelector({
  selectedTags,
  onSelect,
}: TagSelectorProps) {
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(
    selectedTags.map((tag) => tagTranslationMap[tag] || tag)
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const MAX_TAGS = 3;

  const isHotTag = (tag: string) => {
    
    return hotTags.includes(tag);
  };

  useEffect(() => {
    setLocalSelectedTags(
      selectedTags.map((tag) => tagTranslationMap[tag] || tag)
    );
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    const translatedTag = tagTranslationMap[tag];
    if (!translatedTag) return;

    if (localSelectedTags.includes(translatedTag)) {
      setLocalSelectedTags(
        localSelectedTags.filter((t) => t !== translatedTag)
      );
      setShowAlert(false);
    } else if (localSelectedTags.length < MAX_TAGS) {
      setLocalSelectedTags([...localSelectedTags, translatedTag]);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleConfirm = () => {
    onSelect(localSelectedTags);
  };

  return (
    <div className={styles.container}>
      {showAlert && (
        <Alert
          message={`태그는 최대 ${MAX_TAGS}개까지 선택 가능합니다.`}
          type="warning"
          showIcon
        />
      )}
      <div className={styles.tagList}>
        <div className={styles.tagListTitle}>분위기</div>
        <div className={styles.tagItemContainer}>
          {moodTags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tagItem} ${
                localSelectedTags.includes(tagTranslationMap[tag])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {isHotTag(tag) && (
                <img
                  src={hot_mark.src}
                  alt="hot Mark"
                  className={styles.hotMark}
                />
              )}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tagList}>
        <div className={styles.tagListTitle}>색상</div>
        <div className={styles.tagItemContainer}>
          {colorTags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tagItem} ${
                localSelectedTags.includes(tagTranslationMap[tag])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {isHotTag(tag) && (
                <img
                  src={hot_mark.src}
                  alt="hot Mark"
                  className={styles.hotMark}
                />
              )}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tagList}>
        <div className={styles.tagListTitle}>계절</div>
        <div className={styles.tagItemContainer}>
          {seasonTags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tagItem} ${
                localSelectedTags.includes(tagTranslationMap[tag])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {isHotTag(tag) && (
                <img
                  src={hot_mark.src}
                  alt="hot Mark"
                  className={styles.hotMark}
                />
              )}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Button
          type="primary"
          onClick={handleConfirm}
          size="middle"
          className={styles.subBtn}
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}

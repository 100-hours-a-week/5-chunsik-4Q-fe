"use client";

import React, { createContext, useContext, useState } from "react";
import { likeImage, unlikeImage } from "./photo_api";

type LikeContextType = {
  active: boolean;
  likeCount: number;
  toggleLike: (imageId: string) => Promise<void>;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider = ({
  children,
  initialLiked,
  initialLikeCount,
  imageId,
}: {
  children: React.ReactNode;
  initialLiked: boolean;
  initialLikeCount: number;
  imageId: string;
}) => {
  const [active, setActive] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const toggleLike = async (imageId: string) => {
    try {
      if (active) {
        // Unlike
        const response = await unlikeImage(imageId);
        if (response) {
          setActive(false);
          setLikeCount((prev) => prev - 1);
        }
      } else {
        // Like
        const response = await likeImage(imageId);
        if (response) {
          setActive(true);
          setLikeCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Failed to toggle like status:", error);
    }
  };

  return (
    <LikeContext.Provider value={{ active, likeCount, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLikeContext must be used within a LikeProvider");
  }
  return context;
};

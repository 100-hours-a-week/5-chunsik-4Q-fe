"use client";

export const dynamic = "force-dynamic";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "./_components/item-container";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParamsHandler from "./_components/search-params";

export default function Page() {
  return (
    <Suspense>
      <GalleryContent />
    </Suspense>
  );
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const [isSearchContainerVisible, setIsSearchContainerVisible] = useState(false);
  const queryClient = new QueryClient();

  const categoryParam = searchParams?.get("category") || "all";
  const tagParam = searchParams?.get("tag") || "";
  const sortParam = searchParams?.get("sort") || "latest";

  return (
    <QueryClientProvider client={queryClient}>
      <SearchParamsHandler
        isSearchContainerVisible={isSearchContainerVisible}
        setIsSearchContainerVisible={setIsSearchContainerVisible}
      />
      <Suspense>
        <Container category={categoryParam} tag={tagParam} sort={sortParam} />
      </Suspense>
    </QueryClientProvider>
  );
}

import { useInfiniteQuery } from 'react-query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

// API 호출 함수
const fetchGalleryData = async ({
  pageParam = 0,
  category,
  tag,
  sort,
}: { pageParam?: number } & UseGalleryQueryParams): Promise<GalleryResponse> => {
  const token = sessionStorage.getItem('AccessToken');

  const url = new URL(`${BASE_URL}/gallery`);
  url.searchParams.append('page', pageParam.toString());
  if (category && category !== 'all') url.searchParams.append('categoryName', category);
  if (tag) url.searchParams.append('tagName', tag);
  if (sort) url.searchParams.append('sort', sort);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gallery data.');
  }

  return response.json();
};

export const useGalleryQuery = ({ category, tag, sort }: UseGalleryQueryParams) => {
  return useInfiniteQuery<GalleryResponse, Error>(
    ['galleryData', category, tag, sort], // 쿼리 키
    ({ pageParam = 0 }) => fetchGalleryData({ pageParam, category, tag, sort }), // 페칭 함수
    {
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.content.length), // 다음 페이지 조건
    }
  );
};
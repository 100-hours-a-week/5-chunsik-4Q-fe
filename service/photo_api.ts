const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const generatePhotoImg = async (category: string, tags: string[]) => {
    try {
        const response = await fetch(`${BASE_URL}/image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category, tags })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("이미지 생성에 실패했습니다.");
        }
    } catch(error) {
        throw error;
    }
};

export const generateTicket = async (
    ticketImage: File,
    backgroundImageId: number,
    shortenUrlId: number,
    title: string,
) => {
    try {
        const formData = new FormData();
        formData.append("ticketImage", ticketImage);
        formData.append("backgroundImageId", backgroundImageId.toString());  
        formData.append("shortenUrlId", shortenUrlId.toString());  
        formData.append("title", title);

        const response = await fetch(`${BASE_URL}/ticket`, { 
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return {
                ticketId: data.id
            };
        } else {
            throw new Error("티켓 생성에 실패했습니다.");
        }
    } catch (error) {
        throw error;
    }
};


export const getTicketInfo = async (ticketId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/ticket/${ticketId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return {
                ticketUrl: data.ticketUrl,
                title: data.title,
                shortenUrl: data.shortenUrl
            };
        } else {
            throw new Error("티켓 정보를 가져오는데 실패했습니다.");
        }
    } catch (error) {
        throw error;
    }
};

// 좋아요 추가
export const likeImage = async (imageId: string) => {
    const token = localStorage.getItem('AccessToken'); 
  
    if (!token) {
      throw new Error('Access token is missing.');
    }
  
    try {
      const response = await fetch(`${BASE_URL}/gallery/${imageId}/like`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json", 
        },
      });
  
      if (response.ok) {
        const data = await response.json(); 
        return data;
      } else {
        throw new Error('Failed to like the image.');
      }
    } catch (error) {
      console.error('Error liking the image:', error);
      throw error;
    }
  };

  // 좋아요 삭제
  export const unlikeImage = async (imageId: string) => {
    const token = localStorage.getItem('AccessToken');
  
    if (!token) {
      throw new Error('Access token is missing.');
    }
  
    try {
      const response = await fetch(`${BASE_URL}/gallery/${imageId}/like`, {
        method: 'DELETE', // Changed to DELETE for unliking the image
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to unlike the image.');
      }
    } catch (error) {
      console.error('Error unliking the image:', error);
      throw error;
    }
  };
  
  
// 갤러리 이미지 요청
export const getGalleryData = async (page) => {
  const token = localStorage.getItem('AccessToken');

  // Construct the URL with an optional page query parameter
  const url = `${BASE_URL}/gallery?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch gallery data.');
    }
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    throw error;
  }
};

  
// 내 이미지 목데이터
  export const getMyTicket = async() => {
    const token = localStorage.getItem('AccessToken');
    try {
        const response = await fetch(`${BASE_URL}/myPQ`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("티켓 정보를 가져오는데 실패했습니다.");
        }
    } catch (error) {
        throw error;
    }
};
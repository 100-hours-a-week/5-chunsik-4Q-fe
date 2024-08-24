const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const generatePhotoImg = async (category: string, tags: string) => {
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
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const feedbackSubmit = async (starRate: string) => {
    try {
        const response = await fetch(`${BASE_URL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("이메일 인증 요청에 실패했습니다.");
        }

        return response.json(); // 필요한 경우 반환할 데이터를 수정
    } catch (error) {
        console.error("Error in requestEmailVerification:", error);
        throw error;
    }
};
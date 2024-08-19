const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const requestEmailVerification = async (email: string) => {
    try {
        const response = await fetch(`${BASE_URL}/users/email/request`, {
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

export const verifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await fetch(`${BASE_URL}/users/email/verification`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, code }),
        });

        if (!response.ok) {
            console.log(email, code);
            throw new Error("이메일 인증에 실패했습니다.");
        }

        return response.json(); 
    } catch (error) {
        console.error("Error in verifyEmailCode:", error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // console.log("Request body:", { email, password });
            throw new Error("로그인에 실패했습니다.");
        }

        return response.json();
    } catch (error) {
        console.error("Error in login:", error);
        throw error;
    }
};
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
        return "이메일이 전송되었습니다."; 
    } catch (error) {
        console.error("Error in requestEmailVerification:", error);
        throw error;
    }
};


export const verifyEmailCode = async (email, code) => {
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

        return { success: true };  // Return a specific success response
    } catch (error) {
        console.error("Error in verifyEmailCode:", error);
        throw error;
    }
};

export const requestRegister = async (email: string, password: string, nickname: string) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, nickname }),
        });

        if (!response.ok) {
            console.log(email, password, nickname);
            throw new Error("회원가입에 실패했습니다.");
        }

        return { success: true };  
    } catch (error) {
        console.error("Error in register:", error);
        throw error;
    }
};

export const requestLogin = async (email: string, password: string) => {
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
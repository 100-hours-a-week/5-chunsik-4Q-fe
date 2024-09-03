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

        return { success: true };  
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

        if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;  
            localStorage.setItem('AccessToken', token); 
            return { success: true };  
        } else {
            throw new Error("로그인에 실패했습니다.");
        }
        return response.json();
    } catch (error) {
        console.error("Error in login:", error);
        throw error;
    }
};

export const requestLogout = async () => {
    const token = localStorage.getItem('AccessToken');
  
    if (!token) {
      throw new Error('No access token found. You are not logged in.');
    }
  
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        localStorage.removeItem('AccessToken');
        return { success: true };
      } else {
        throw new Error("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error in logout:", error);
      throw error;
    }
  };
  


export const requestUserInfo = async () => {
    try {
        const token = localStorage.getItem('AccessToken');
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            const { nickname, email } = data;
            return { nickname, email };
        } else {
            console.error('Failed to fetch user info', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};


//refresh token으로 access token 요청하기
export const requestAccessToken = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { accessToken } = data;

            localStorage.setItem('AccessToken', accessToken);

            return accessToken;
        } else {
            console.error('Failed to refresh access token', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};

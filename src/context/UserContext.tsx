"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { requestLogout } from '@/service/auth_api';

type User = {
  email: string;
  nickname: string;
};

type UserContextType = {
  user: User | null;
  isLogin: boolean;
  accessToken: string | null;  // AccessToken 추가
  login: (user: User) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;  // AccessToken 설정 함수 추가
  setLogin: (isLogin: boolean) => void;
};

// UserContext 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider 컴포넌트
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);  // AccessToken 상태 추가

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('AccessToken');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLogin(true);
    }
    if (storedToken) {
      setAccessToken(storedToken);  // AccessToken 복원
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    setLogin(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setLogin(false);
    setAccessToken(null);  
    localStorage.removeItem('user');
    localStorage.removeItem('AccessToken');
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <UserContext.Provider value={{ user, isLogin, accessToken, login, logout, setAccessToken, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}

// UserContext를 사용하는 커스텀 훅
export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}

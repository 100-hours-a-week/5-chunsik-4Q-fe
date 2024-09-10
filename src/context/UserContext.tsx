"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { message} from "antd";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  nickname: string;
};

type UserContextType = {
  user: User | null;
  isLogin: boolean;
  accessToken: string | null;  
  login: (user: User) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;  
  setLogin: (isLogin: boolean) => void;
};

// UserContext 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider 컴포넌트
export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('AccessToken');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLogin(true);
    }
    if (storedToken) {
      setAccessToken(storedToken);  
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
    router.push("/login");
    message.success("로그아웃 되었습니다");
  };

  return (
    <UserContext.Provider value={{ user, isLogin, accessToken, login, logout, setAccessToken, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}

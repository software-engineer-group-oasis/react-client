"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAction } from '@/apis/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [online, setOnline] = useState(false);  // 新增状态，用于跟踪用户是否在线

    // 尝试从本地存储中获取用户信息
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (userData) => {
        try {
            const data = (await loginAction(userData)).data; 
            const nextUser = data.user;
            setUser(nextUser);
            setOnline(true);  // 登录成功后设置为在线状态
            localStorage.setItem('user', JSON.stringify(nextUser));
        } catch {
            throw new Error('登录失败');
        }
    };

    const logout = () => {
        setUser(null);
        setOnline(false);  // 登出后设置为离线状态
        localStorage.removeItem('user');
        
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, online }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
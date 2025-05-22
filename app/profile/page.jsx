// 展示用户登录信息 包括用户名 邮箱 头像 电话

"use client"

import { useEffect, useState } from "react"
import './profile.css'
import { logout } from "@/apis/auth.api"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        image: '',
        phone: ''
    })
    
    useEffect(()=> {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                setUser(userObj);
            } catch (e) {
                // 解析失败，保持默认 user
            }
        }
    }, [])

    const handleLogout = async() => {
        try {
            const data = await logout();
            toast.success('登出成功，即将前往登录页')
            setTimeout(()=>{
                router.push('/login')
            }, 1000)
        } catch {
            toast.error('服务器繁忙')
        }
    }

    return (
        <div>
            <Toaster />
            <div className='c-profile-form'>
                <img type="text" src={user.image ? user.image : '/images/default.png'} width="50rem"/>
                
                <div className="c-form-item">
                    <label htmlFor="name">用户名</label>
                    <input type="text" id='name' defaultValue={user.name} className="c-input"/>
                </div>
                <div className="c-form-item">
                    <label htmlFor="email">邮箱&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" value={user.email} readOnly className="c-input"/>
                </div>
                <div className="c-form-item">
                    <label htmlFor="phone">电话&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" defaultValue={user.phone ? user.phone : ''} className="c-input"/>
                </div>
                <div className="c-form-item">
                    <button className="c-button" onClick={handleLogout}>退出登录</button>
                    <button className="c-button">更新资料</button>
                </div>
            </div>
        </div>
    )
}
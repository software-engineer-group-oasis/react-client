// 展示用户登录信息 包括用户名 邮箱 头像 电话

"use client"

import { useEffect, useState } from "react"
import './profile.css'
import { logout } from "@/apis/auth.api"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
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
            localStorage.removeItem('user')
            setTimeout(()=>{
                router.push('/login')
            }, 1000)
        } catch {
            toast.error('服务器繁忙')
        }
    }

    const handleUpdate = async() => {
        try {
            let url = ''
            let id = ''
            
            if (JSON.parse(localStorage.getItem('user')).renter_id) {
                id = JSON.parse(localStorage.getItem('user')).renter_id
                url =  "/api/renters"
            } else if (JSON.parse(localStorage.getItem('user')).contact_id) {
                id = JSON.parse(localStorage.getItem('user')).contact_id
                url = '/api/contacts'
            }
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id, ...user})
            })
            const data = (await res.json()).data
            localStorage.setItem('user', JSON.stringify(data))
            toast.success('资料更新成功');
        } catch (error) {
            toast.error('资料更新失败')
            console.error("资料更新失败", error)
        }
    }

    return (
        <div>
            <Toaster />
            <div className='c-profile-form'>
                <img type="text" src={user.image ? user.image : '/images/default.png'} width="50rem"/>
                
                <div className="c-form-item">
                    <label htmlFor="name">用户名</label>
                    <input type="text" id='name' defaultValue={user.name} className="c-input" onChange={
                    (e)=> setUser({...user, name:e.target.value})}/>
                </div>
                <div className="c-form-item">
                    <label htmlFor="email">邮箱&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" value={user.email} readOnly className="c-input"/>
                </div>
                <div className="c-form-item">
                    <label htmlFor="phone">电话&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" defaultValue={user.phone ? user.phone : ''} className="c-input" onChange={
                    (e)=> setUser({...user, phone: e.target.value})}/>
                </div>
                <div className="c-form-item">
                    <button className="c-button" onClick={handleLogout}>退出登录</button>
                    <button className="c-button" onClick={handleUpdate}>更新资料</button>
                </div>
            </div>
        </div>
    )
}
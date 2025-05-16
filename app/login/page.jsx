'use client';

import {useRef, useState} from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link'; // 导入 Link 组件
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {login} from "@/apis/auth.api";
export default function Login() {    
    const { user, setUser } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState('renter');

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        try {
           const data = (await login({ email, password }, selectedRole)).data;
           console.log(data);
           setUser(data.user);
           localStorage.setItem('user', JSON.stringify(data.user));
           toast.success('登录成功');
           setTimeout(()=> {
            router.push('/');
           }, 1000);
        } catch (error) {
            toast.error('登录失败');
            console.error('登录失败:', error.message);
        }
    }

    return (
        <div style={{
            backgroundImage: 'url(/images/a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // 添加相对定位
            height: '100%'
        }} className="flex justify-center items-center h-full">
            {/* 添加阴影遮罩层 */}
            <Toaster />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)' // 半透明黑色遮罩
            }}></div>
            <form onSubmit={handleSubmit} className="container flex flex-col gap-4 w-1/3 bg-slate-100/80 py-6 px-4 max-w-md z-100">
                <input type="text" ref={emailRef} placeholder="邮箱" className="input w-full" required/>
                <input type="password" ref={passwordRef} placeholder='密码' className='input w-full' required/>
                <div className="flex gap-4">
                    <label>
                        <input
                            type="radio"
                            name="userRole"
                            value="renter"
                            className="radio radio-primary"
                            checked={selectedRole === 'renter'}
                            onChange={() => setSelectedRole('renter')}
                        />
                        &nbsp;
                        我是租客
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userRole"
                            value="seller"
                            className="radio radio-primary"
                            checked={selectedRole === 'seller'}
                            onChange={() => setSelectedRole('seller')}
                        />
                        &nbsp;
                        我是房主
                    </label>
                </div>
                <button className="btn btn-primary">登录</button>
                <Link href="/register" className="text-blue-500 hover:underline">还没有账号？立即注册</Link>
            </form>
        </div>
    )
}
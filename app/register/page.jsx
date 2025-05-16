"use client";
import {register} from '@/apis/auth.api';
import Link from 'next/link'; // 导入 Link 组件
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const [selectedRole, setSelectedRole] = useState('renter'); // 初始化选中值为 'renter'
    const usernameRef = useRef(); // 用于存储用户名输入框的引用
    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();
    async function handleSubmit(e) {
        e.preventDefault(); // 阻止表单的默认提交行为
        const name = usernameRef.current.value; // 获取用户名输入框的值
        const email = emailRef.current.value; // 获取邮箱输入框的值
        const password = passwordRef.current.value; // 获取密码输入框的值
        
        try {
            const data = await register({ name, email, password }, selectedRole); // 调用注册函数，传递用户名、邮箱和密码作为参数
            console.log(data);
            console.log('注册成功'); // 注册成功后输出提示信息
            toast.success('注册成功，即将跳往登录页面');
            setTimeout(()=> {router.push('/login')}, 2000);
        } catch (error) {
            console.error('注册失败:', error.message);
            toast.error(`注册失败 ${error.message}`);
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
            <Toaster />
            {/* 添加阴影遮罩层 */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)' // 半透明黑色遮罩
            }}></div>
            <form onSubmit={handleSubmit} className="container flex flex-col gap-4 w-1/3 bg-slate-100/80 py-6 px-4 max-w-md z-100">
                <input type="text" ref={usernameRef} placeholder="用户名" className="input w-full" required/>
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
                        租客
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
                        房主
                    </label>
                </div>
                <button className="btn btn-primary">注册</button>
                <Link href="/login" className="text-blue-500 hover:underline">已有账号，立即登录</Link>
            </form>
        </div>
    )
}
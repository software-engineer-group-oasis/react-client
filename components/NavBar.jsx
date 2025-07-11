'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@mdi/react';
import { mdiBellBadge,mdiAccountBox,mdiHomeCircle, mdiGoogle} from '@mdi/js';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  {
    href:'/',
    name:'首页',
  },
  {
    href:'/properties',
    name:'房源',
  },
  {
    href:'/properties/add',
    name:'发布房源',
  },
  {
    href:'/manage',
    name:'房源管理',
  }
]

export default function NavBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const {user} = useAuth();

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      {/* logo 导航部分 */}
      <div className="flex gap-10 items-center">
        <div>
          <Link href='/'><Icon path={mdiHomeCircle}
          size={2} color={'white'}></Icon></Link>
        </div>
        <div className="text-white font-bold text-2xl">OASIS 绿洲租房</div>
        { user &&
          links.map((item,index)=>(
            <div key={index}>
              <Link href={item.href}>
                <button className={`${pathname === `${item.href}` ? 'bg-black':''} p-1 rounded-sm text-white cursor-pointer hover:bg-slate-600`}>{item.name}</button>
              </Link>
            </div>
          ))
        }
        
      </div>
      {/* 账号 消息 头像部分 */}
      <div className="flex gap-10 items-center">
        { !user &&
          (
          <div>
          <Link href='/login'>
            <button className='bg-slate-600 rounded-sm text-white p-2 flex gap-5'>
              <Icon path={mdiGoogle} size={1}></Icon>登录</button>
            </Link>  
          </div>
          
          )
        }
        {
          user && (
            <>
            <div>
              <Link href="/messages">
                <Icon path={mdiBellBadge} size={1} color={'white'}></Icon>
              </Link>
            </div>
            <div>
              <Link href="/profile">
                <Icon path={mdiAccountBox} size={1} color={'white'}></Icon>
              </Link>
            </div>
            </>
          )
        }
        
      </div>
    </nav>
  )
}
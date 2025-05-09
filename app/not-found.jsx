import Link from "next/link";
import Icon from '@mdi/react';
import { mdiAlert } from '@mdi/js';
// 自定义404页面
export default function NotFound() {
  return (
    <div className="flex justify-center m-4">
      <section className="h-fit p-20 flex flex-col items-center gap-2
      bg-white w-fit shadow-2xl rounded-sm">
        <Icon path={mdiAlert} size={4} color='oklch(0.828 0.189 84.429)'></Icon>
        <h2 className="font-bold text-2xl">Page Not Found</h2>
        <p className="text-slate-300">页面不存在</p>
        <button className="bg-blue-600 p-2 text-white rounded-sm font-bold">
        <Link href="/">Go Home</Link></button>
      </section>
    </div>
  )
}
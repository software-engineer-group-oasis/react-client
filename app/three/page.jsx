// 展示3d模型
"use client"

import dynamic from "next/dynamic"

// 动态导入，关闭ssr
const Three = dynamic(() => import('./ThreeClient'), {ssr: false})

export default function Page() {
    return <Three />
}
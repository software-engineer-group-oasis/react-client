"use client"
import dynamic from "next/dynamic";

const ManagePage = dynamic(()=> import('@/components/ManagePage'), {ssr:false})

export default function Manage() {
    return <ManagePage />
}
"use client"
import dynamic from "next/dynamic";

const AddPropertyPage = dynamic(()=>import('@/components/AddPropertyPage'), {
  ssr: false
})

export default function AddProperty() {
  return <AddPropertyPage />
}
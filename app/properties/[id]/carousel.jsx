"use client"
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Box } from "lucide-react";

export default function Carousel({images, width='100%', height='auto'}) {
    const length = images.length; // 图片数量
    if (length === 0) return null; // 空数组不渲染任何
    const [index, setIndex] = useState(0);
    return (
        <div>
            <div className="carousel w-full" style={{width, height}}>
                {
                    <div className="carousel-item relative w-full" >
                        <img
                        src={images[index]}
                        className="w-full rounded-md" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <span className="btn btn-circle" onClick={()=>setIndex((((index - 1) + images.length)) % images.length)}>❮</span>
                        <span className="btn btn-circle" onClick={()=>setIndex((index + 1) % images.length)}>❯</span>
                        </div>
                    </div>
                }
            </div>
            <p>{index + 1}/{length}</p>
            <Link href="/three" className="btn btn-primary"><Box /> 3D 看房</Link>
        </div>
    )
}
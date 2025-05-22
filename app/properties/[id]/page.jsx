"use client";

import Carousel from "./carousel";
import "./property.css";
import { Refrigerator, WashingMachine, ShowerHead, AirVent, Tv, Sofa, CookingPot, Wifi, Bed, Toilet, MailPlus, User, Phone } from 'lucide-react';
import BaiduMap from "@/components/BaiduMap";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getPropertyById } from "@/apis/property.api";
import Link from "next/link";
import {sendMessageToChatbot} from "@/apis/property.api";
import Markdown from "./markdown";

export default function Property() {
    const [data, setData] = useState();
    const {id} = useParams();

    const [userInput, setUserInput] = useState("");
    const [chatbotResponse, setChatbotResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPropertyData = async() => {
            try {
                const propertyData = (await getPropertyById(id)).data;
                setData(propertyData);
            } catch (error) {
                console.log('加载房产信息失败:',error);
            }
        };
        if (id) {
            fetchPropertyData();
        }
    }, [id])
    if (!data) {
        return <div>Loading...</div>;
    }

    const {name, type, house_type,description, location, beds, baths, area, amenities, monthly_rate, seller_contact, images} = data;

    const handleSendMessage = async () => {
        if (userInput.trim() === "") return;
        setIsLoading(true);
        try {
            const response = await sendMessageToChatbot(userInput, data);
            console.log('response from deepseek: ', response);
            setChatbotResponse(response.data);
        } catch (error) {
            console.log('发送消息到 Chatbot 失败:', error);
            setChatbotResponse('获取回答失败，请稍后重试。');
        } finally {
            setIsLoading(false);
            setUserInput('');
        }
    }

    return (
        <div className="c-parent">
            <div className='c-container'>
                <div className="c-flex-container">
                    {/* 房源基本信息  图片 + 卡片*/}
                    <div className="c-card c-hero">
                        <h1 className="c-heading-1">{name}</h1>
                        <Carousel images={images} width="800px" height="600px"/>
                    </div>
                    {/* 出售者信息 */}
                    <div className="c-card">
                        <div className="c-profile-picture">
                            <img src={seller_contact?.image} alt="出售者头像" />
                        </div>
                        <hr />
                        <br />
                        <div>
                            <ul className='flex flex-col gap-1.5 text-blue-600'>
                                <li className='flex gap-1'><User /> {seller_contact?.name}</li>
                                <li className="flex gap-1"><MailPlus /> <a href={`mailto:${seller_contact?.email}`}>{seller_contact?.email}</a></li>
                                <li className='flex gap-1'><Phone /> <a href={`tel:${seller_contact?.phone}`}>{seller_contact?.phone}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* AI 分析功能 */}
                <div className="c-card">
                    <h2 className="c-heading-2">AI 分析</h2>
                    <form className='c-chat-form'>
                        <input
                            className="c-message-input"
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="输入你的问题..."
                        />
                        <button className='c-message-button' onClick={handleSendMessage} disabled={isLoading}>
                            {isLoading ? '分析中...' : '发送'}
                        </button>
                    </form>

                    {chatbotResponse && (
                        <div>
                            <h3>Chatbot 回答:</h3>
                            <Markdown content={chatbotResponse} />
                        </div>
                    )}
                </div>
                {/* 房屋信息 */}
                <div className="c-card">
                    <h2 className="c-heading-2">房屋信息</h2>
                    <div>
                        <ul className='c-grid-3'>
                            <li className="c-price">{monthly_rate}元/月</li>
                            <li>户型：{house_type}</li>
                            <li>位置：{location.province}-{location.city}</li>
                            <li className="c-link"><Link href="#map">地址：{location.address}</Link></li>
                            <li>面积：{area}平方米</li>
                            <li>类型：{type}</li>
                            <li>卧室：{beds}</li>
                            <li>卫生间：{baths}</li>
                        </ul>
                    </div>
                </div>
                {/* 房屋配套 */}
                <div className='c-card'>
                    <h2 className="c-heading-2">房屋配套</h2>
                    <div>
                        <ul className='c-grid-5'>
                            <li className={amenities.includes("refrigerator") ? 'c-skyblue':'c-default'}><Refrigerator />冰箱</li>
                            <li className={amenities.includes("washing_machine") ? 'c-skyblue':'c-default'}><WashingMachine />洗衣机</li>
                            <li className={amenities.includes("shower_head") ? 'c-skyblue':'c-default'}><ShowerHead />热水器</li>
                            <li className={amenities.includes("air_conditioner") ? 'c-skyblue':'c-default'}><AirVent />空调</li>
                            <li className={amenities.includes("tv") ? 'c-skyblue':'c-default'}><Tv />电视</li>
                            <li className={amenities.includes("sofa") ? 'c-skyblue':'c-default'}><Sofa />沙发</li>
                            <li className={amenities.includes("kitchen") ? 'c-skyblue':'c-default'}><CookingPot />厨房</li>
                            <li className={amenities.includes("wifi") ? 'c-skyblue':'c-default'}><Wifi />网络</li>
                            <li className={amenities.includes("bed") ? 'c-skyblue':'c-default'}><Bed />床</li>
                            <li className={amenities.includes("toilet") ? 'c-skyblue':'c-default'}><Toilet />卫生间</li>
                        </ul>
                    </div>
                </div>
                {/* 房屋概况 */}
                <div className="c-card">
                    <h2 className="c-heading-2">房屋概况</h2>
                    <div>
                        <p>{description}</p>
                    </div>
                </div>
                {/* 地图 */}
                <div className="c-card" id="map">
                    <h2 className="c-heading-2">房屋位置</h2>
                    <BaiduMap center={location.province + location.city + location.address}/>
                </div>
            </div>    
        </div>
    )
}


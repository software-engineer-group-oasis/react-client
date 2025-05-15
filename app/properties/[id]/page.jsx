"use client";

import properties from "@/json/properties.json";
import Carousel from "./carousel";
import "./property.css";
import { Refrigerator, WashingMachine, ShowerHead, AirVent, Tv, Sofa, CookingPot, Wifi, Bed, Toilet } from 'lucide-react';
import BaiduMap from "@/components/BaiduMap";

export default function Property() {
    const mockData = properties[0];
    console.log(mockData);
    const {name, type, house_type,description, location, beds, baths, area, amenities, rates, seller_info, images} = mockData;
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
                            <img src={seller_info.image} alt="出售者头像" />
                        </div>
                        <hr />
                        <div>
                            <ul>
                                <li>{seller_info.name}</li>
                                <li>{seller_info.email}</li>
                                <li>{seller_info.phone}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* 房屋信息 */}
                <div className="c-card">
                    <h2 className="c-heading-2">房屋信息</h2>
                    <div>
                        <ul className='c-grid-3'>
                            <li className="c-price">{rates.monthly}元/月</li>
                            <li>户型：{house_type}</li>
                            <li>位置：{location.province}-{location.city}</li>
                            <li>地址：{location.address}</li>
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
                            <li className={amenities.refrigerator ? 'c-skyblue':'c-default'}><Refrigerator />冰箱</li>
                            <li className={amenities.washing_machine ? 'c-skyblue':'c-default'}><WashingMachine />洗衣机</li>
                            <li className={amenities.shower_head ? 'c-skyblue':'c-default'}><ShowerHead />热水器</li>
                            <li className={amenities.air_conditioner ? 'c-skyblue':'c-default'}><AirVent />空调</li>
                            <li className={amenities.tv ? 'c-skyblue':'c-default'}><Tv />电视</li>
                            <li className={amenities.sofa ? 'c-skyblue':'c-default'}><Sofa />沙发</li>
                            <li className={amenities.kitchen ? 'c-skyblue':'c-default'}><CookingPot />厨房</li>
                            <li className={amenities.wifi ? 'c-skyblue':'c-default'}><Wifi />网络</li>
                            <li className={amenities.bed ? 'c-skyblue':'c-default'}><Bed />床</li>
                            <li className={amenities.toilet ? 'c-skyblue':'c-default'}><Toilet />卫生间</li>
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
                <div className="c-card">
                    <h2 className="c-heading-2">房屋位置</h2>
                    <BaiduMap center={location.province + location.city + location.address}/>
                </div>
            </div>    
        </div>
    )
}


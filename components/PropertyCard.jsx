import Image from "next/image";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiBathtub,mdiRuler ,mdiMap, mdiBed  } from '@mdi/js';
import "./property-card.css";

export default function PropertyCard({property}) {
  const {type, name, beds, baths, area, location, monthly_rate, id, images} = property;
  const {province, city, address} = location;

  const getRateDisplay = () => {
    return monthly_rate ? `${monthly_rate}元/月` : '面议';
  }
  return (
    <div className="rounded-lg bg-white w-fit overflow-auto shadow-2xl shadow-slate-300 property-card">
      <div className="relative">
        <img src={images[0]} alt="住房图片" />
        <div className="bg-white p-1 rounded-sm absolute right-2 top-2 text-blue-600 font-bold">{getRateDisplay()}</div>
      </div>
      <div className="p-4">
        {/* 概要信息 */}
        <div className="border-b-2 border-slate-400">
            <p className="text-slate-400">{type}</p>
            <h3 className="font-bold text-2xl">{name}</h3>
            <div className="mt-4 mb-4">
                <div className="flex gap-4 justify-center text-slate-400 ">
                    <p><Icon path={mdiBed} size={.8}></Icon>{beds} 床位</p>
                    <p><Icon path={mdiBathtub} size={.8}></Icon>{baths} 浴室</p>
                    <p><Icon path={mdiRuler} size={.8}></Icon>{area} 平方米</p>
                </div>
            </div>
            
        </div>
        {/* 地址信息和详情按键 */}
        <div className="flex justify-between mt-2">
          <p className="text-red-700"><Icon path={mdiMap} size={.8}/>{province}-{city}-{address}</p>
          <button className="bg-blue-500 text-white p-2 rounded-lg detail-button"><Link href={`/properties/${id}`}>详细信息</Link></button>
        </div>
      </div>
    </div>
    
  )
}
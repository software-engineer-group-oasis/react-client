import Image from "next/image";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiBedEmpty,mdiBathtub,mdiRuler,mdiCash100 ,mdiMap, mdiBed  } from '@mdi/js';
export default function PropertyCard({property}) {
  const {type, name, beds, baths, square_feet, location, rates} = property;
  const {street, city, state, zipcode} = location;

  const getRateDisplay = () => {
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/nt`
    }
  }
  return (
    <div className="rounded-lg bg-white w-fit overflow-auto shadow-2xl shadow-slate-300">
      <div className="relative">
        <Image src="/images/a.jpg" width={200} height={200} alt="apartment"></Image>
        <div className="bg-white p-1 rounded-sm absolute right-36 top-2 text-blue-600 font-bold">{getRateDisplay()}</div>
      </div>
      <div className="p-4">
        {/* 概要信息 */}
        <div className="border-b-2 border-slate-400">
            <p className="text-slate-400">{type}</p>
            <h3 className="font-bold text-2xl">{name}</h3>
            <div className="mt-4 mb-4">
                <div className="flex gap-4 justify-center text-slate-400 ">
                    <p><Icon path={mdiBed} size={.8}></Icon>{beds} beds</p>
                    <p><Icon path={mdiBathtub} size={.8}></Icon>{baths} baths</p>
                    <p><Icon path={mdiRuler} size={.8}></Icon>{square_feet} sqft</p>
                </div>
                <div className="flex gap-4 justify-center text-green-400">
                    <p><Icon path={mdiCash100} size={.8}></Icon>weekly</p>
                    <p><Icon path={mdiCash100} size={.8}></Icon>monthly</p>
                </div>
            </div>
            
        </div>
        {/* 地址信息和详情按键 */}
        <div className="flex justify-between mt-2">
          <p className="text-red-700"><Icon path={mdiMap} size={.8}/>{city } {state}</p>
          <button className="bg-blue-500 text-white p-2 rounded-lg">Details</button>
        </div>
      </div>
    </div>
    
  )
}
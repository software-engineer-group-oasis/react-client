"use client";

import {getProvinces, getCities} from "@/apis/district.api";
import {useEffect, useState} from "react";
import {Search} from "lucide-react";
import {useRouter} from "next/navigation";

export default function Hero() {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchProvinces = async () => {
            try {

                const districts = (await getProvinces()).data.districts[0].districts;
                console.log("districts: ", districts)
                setProvinces(districts);
                setProvince(districts[0].name);
            } catch (error) {
                console.error('获取省份信息失败:', error);
            }
        };
        fetchProvinces();
    },[]);

    useEffect(() => {
        if (province) {
            (async() => {
                try {
                    const districts = (await getCities(province)).data.districts[0].districts;
                    console.log(districts)
                    setCities(districts);
                    setCity(districts[0].name);
                } catch (error) {
                    console.error('获取城市信息失败:', error);
                }
            })();
        }
    }, [province])

    const router = useRouter();

    const handleSearch = () => {
        router.push(`/properties?province=${province.substring(0, province.length - 1)}&city=${city.substring(0, city.length - 1)}`);
    }

  return (
    <section className='bg-blue-500 p-12 flex flex-col gap-5'>
      <hr style={{
        color:"white"
      }}/>
      {/* heading */}
      <div>
        <h1 className="text-white text-center
        font-bold text-6xl">寻找属于你的港湾</h1>
      </div>
      {/* description */}
      <div>
        <p className="text-white text-center">
        Discover the perfect property that suits your needs</p>
      </div>
    {/*行政区划*/}
        <div className="flex gap-10 justify-center">
            <div>
                <label htmlFor="province" className="text-white text-2xl">省份&nbsp;&nbsp;</label>
                <select className="bg-white rounded-sm p-4" name='province' id='province' value={province} onChange={(e)=>setProvince(e.target.value)}>
                    {
                        provinces.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label htmlFor='city' className="text-white text-2xl">城市&nbsp;&nbsp;</label>
                <select className="bg-white rounded-sm p-4" name="city" id="city" value={city} onChange={(e)=>setCity(e.target.value)}>
                    {
                        cities.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <button onClick={()=> handleSearch()}
                    className="bg-white rounded-[50%] p-4 hover:bg-blue-200 cursor-pointer"
            ><Search /></button>
        </div>

    </section>
  )
}
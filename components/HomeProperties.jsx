import properties from '@/json/properties.json';
import PropertyCard from './PropertyCard';
import Link from 'next/link';
export default function HomeProperties() {
  return (
    <div>
      <h3 className="text-2xl text-blue-400 m-4 text-center font-bold">最新的房源</h3>
      <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
            {
              properties.length === 0 ? ('no data') : (
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {
                    // 展示前3条
                    properties.slice(0,3).map((item, index)=>(
                      <div key={index}>
                        <PropertyCard property={item}></PropertyCard>
                      </div>
                    ))
                  }
                </div>
              )
            }
            </div>
        </section>
        <section className="text-center m-2 bg-black p-4 hover:bg-slate-700">
          <Link href="/properties"
          className="text-white text-center">查看所有房源</Link>
        </section>
    </div>
  )
}
import properties from '@/json/properties.json';
import PropertyCard from '@/components/PropertyCard';
export default function Properties() {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
      {
        properties.length === 0 ? ('no data') : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {
              properties.map((item, index)=>(
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
  )
}
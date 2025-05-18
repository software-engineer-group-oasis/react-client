'use client'
import PropertyCard from '@/components/PropertyCard';
import {useEffect, useState} from 'react';
import {getProperties, getPropertiesByLocation} from '@/apis/property.api';
import {useSearchParams} from 'next/navigation';

export default function Properties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 每页显示的数量
  const [properties, setProperties] = useState([]);



  // 计算当前页的数据
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  // 计算总页数
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // 处理分页按钮点击事件
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const params = useSearchParams();
  const province = params.get('province');
  const city = params.get('city');
  if (province && city) {
    useEffect(() => {
      (async () => {
        try {
          const data = (await getPropertiesByLocation(province, city)).data;
          setProperties(data);
        } catch (error) {
          console.log("获取房源信息出错", error);
          throw error;
        }
      })();
    }, []);

  } else {
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const data = (await getProperties()).data;
          console.log(data)
          setProperties(data);
        } catch (error) {
          console.error('获取房产信息失败:', error);
        }
      };
      fetchProperties();
    },[]);
  }

  return (
    <section className="px-4 py-6">
      <div>
        {
          (province && city) ? (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {province} {city}
                </h2>
                <p className="text-gray-600">
                  找到{properties.length}个房源
                </p>
              </div>
          ): (null)
        }
      </div>

      <div className="container-xl lg:container m-auto px-4 py-6">
        {currentItems.length === 0 ? (
          'no data'
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {currentItems.map((item, index) => (
              <div key={index}>
                <PropertyCard property={item}></PropertyCard>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
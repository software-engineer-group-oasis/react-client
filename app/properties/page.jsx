'use client'
import properties from '@/json/properties.json';
import PropertyCard from '@/components/PropertyCard';
import { useState } from 'react';

export default function Properties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 每页显示的数量

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

  return (
    <section className="px-4 py-6">
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
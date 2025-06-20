"use client";

import { useEffect, useState } from 'react';
import { getProperties, deleteProperty } from '@/apis/property.api';
import { Search, Filter, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// 模拟数据
const mockProperties = [
    {
        _id: "1",
        name: "阳光花园精装三居室",
        type: "普通住宅",
        location: {
            province: "北京",
            city: "朝阳区",
            address: "阳光花园小区3栋2单元801"
        },
        rates: {
            monthly: 6800
        },
        images: ["https://pic1.ajkimg.com/display/anjuke/5aca9d3ad3a0ee4e7308ff4c29bc1083/600x450c.jpg?t=1&srotate=1"]
    },
    {
        _id: "2",
        name: "现代城豪华公寓",
        type: "公寓",
        location: {
            province: "上海",
            city: "浦东新区",
            address: "现代城A座1501"
        },
        rates: {
            monthly: 8500
        },
        images: ["https://pic1.ajkimg.com/display/anjuke/67aa88-%E9%94%A6%E5%B1%85%E6%88%BF%E4%BA%A7/75fc7e46ca9ffc4298bdee270ca1632a-800x650.jpg?frame=1"]
    },
    {
        _id: "3",
        name: "海景别墅",
        type: "别墅",
        location: {
            province: "广东",
            city: "深圳",
            address: "滨海大道1号"
        },
        rates: {
            monthly: 15000
        },
        images: ["https://pic1.ajkimg.com/display/anjuke/5aca9d3ad3a0ee4e7308ff4c29bc1083/600x450c.jpg?t=1&srotate=1"]
    },
    {
        _id: "4",
        name: "城市花园温馨两居室",
        type: "普通住宅",
        location: {
            province: "北京",
            city: "海淀区",
            address: "城市花园小区5栋1单元302"
        },
        rates: {
            monthly: 5500
        },
        images: ["https://pic1.ajkimg.com/display/anjuke/67aa88-%E9%94%A6%E5%B1%85%E6%88%BF%E4%BA%A7/75fc7e46ca9ffc4298bdee270ca1632a-800x650.jpg?frame=1"]
    },
    {
        _id: "5",
        name: "金融中心商务公寓",
        type: "公寓",
        location: {
            province: "上海",
            city: "黄浦区",
            address: "金融中心B座2001"
        },
        rates: {
            monthly: 12000
        },
        images: ["https://pic1.ajkimg.com/display/anjuke/5aca9d3ad3a0ee4e7308ff4c29bc1083/600x450c.jpg?t=1&srotate=1"]
    }
];

export default function ManagePage() {
    const [properties, setProperties] = useState(mockProperties);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();
    const username = JSON.parse(localStorage.getItem("user")).name

    const fetchProperties = async () => {
        try {
            const res = await fetch(`/api/manage/user?name=${username}`)
            const data = (await res.json()).data
            console.log(data)
            setProperties(data);
            //setProperties(mockProperties);
        } catch (error) {
            console.error('获取房产信息失败:', error);
            toast.error('获取房产信息失败');
        }
    };

    useEffect(() => {
        const checkUser = () => {
            if (typeof window !== 'undefined') {
                const userObj = JSON.parse(localStorage.getItem('user'))
                if ('renter_id' in userObj) {
                    toast.error('你不是房东，无法发布房源')
                    setTimeout(()=> {
                    router.push('/login')
                
                    }, 300);
                }
            }
        }

        checkUser();
        fetchProperties();
    }, []);

    // 搜索和筛选
    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            property.location.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || property.type === filterType;
        return matchesSearch && matchesFilter;
    });

    // 分页
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    // 删除房源
    const handleDelete = async (id) => {
        if (window.confirm('确定要删除这个房源吗？此操作不可恢复。')) {
            try {
                // 注释掉实际API调用，使用模拟删除
                // await deleteProperty(id);
                setProperties(properties.filter(p => p._id !== id));
                toast.success('删除成功');
            } catch (error) {
                console.error('删除房产信息失败:', error);
                toast.error('删除失败');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white-800">房源管理</h1>
                <Link href="/properties/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    添加新房源
                </Link>
            </div>

            {/* 搜索和筛选 */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="搜索房源名称或地址..."
                            className="w-full px-4 py-2 border rounded-lg pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-400" />
                    <select
                        className="px-4 py-2 border rounded-lg"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">所有类型</option>
                        <option value="普通住宅">普通住宅</option>
                        <option value="公寓">公寓</option>
                        <option value="别墅">别墅</option>
                    </select>
                </div>
            </div>

            {/* 房源列表 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房源信息</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((property) => (
                            <tr key={property._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={property.images[0]}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{property.name}</div>
                                            <div className="text-sm text-gray-500">{property.type}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{property.location.province}-{property.location.city}</div>
                                    <div className="text-sm text-gray-500">{property.location.address}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{property.rates.monthly}元/月</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        待售
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <Link href={`/properties/${property._id}`} className="text-blue-600 hover:text-blue-900">
                                            <Edit size={20} />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(property._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 分页 */}
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

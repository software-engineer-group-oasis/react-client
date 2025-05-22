'use client';
import { useState } from 'react';
import ImageUpload from './ImageUpload';
import AddressSelector from './AddressSelector';

export default function PropertyForm({ onSubmit, initialData = {}, submitText = '提交' }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    province: '',
    city: '',
    address: {
      province: '',
      city: '',
      district: '',
      street: '',
      detail: ''
    },
    type: '',
    houseType: '',
    area: '',
    monthlyRate: '',
    floor: '',
    direction: '',
    decorate: '',
    beds: 1,
    baths: 1,
    amenities: [],
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    images: [],
    ...initialData
  });

  // 选项数据
  const typeOptions = ['普通住宅', '公寓', '别墅'];
  const floorOptions = ['低层', '中层', '高层'];
  const directionOptions = ['朝南', '朝北', '朝东', '朝西'];
  const decorateOptions = ['精装修', '简装', '毛坯'];
  const amenitiesOptions = [
    { label: '冰箱', value: 'refrigerator' },
    { label: '淋浴', value: 'shower_head' },
    { label: '空调', value: 'air_conditioner' },
    { label: '电视', value: 'tv' },
    { label: '沙发', value: 'sofa' },
    { label: '厨房', value: 'kitchen' },
    { label: 'WiFi', value: 'wifi' },
    { label: '床', value: 'bed' },
    { label: '卫生间', value: 'toilet' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const amenity = value;
      setFormData(prev => ({
        ...prev,
        amenities: checked 
          ? [...prev.amenities, amenity]
          : prev.amenities.filter(item => item !== amenity)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      location: {
        address: formData.address.district + formData.address.street + formData.address.detail,
        city: formData.address.city,
        province: formData.address.province
      },
      seller: {
        name: formData.sellerName,
        email: formData.sellerEmail,
        phone: formData.sellerPhone
      },
      property: {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        floor: formData.floor,
        direction: formData.direction,
        decorate: formData.decorate,
        house_type: formData.houseType,
        beds: parseInt(formData.beds),
        baths: parseInt(formData.baths),
        area: parseFloat(formData.area),
        monthly_rate: parseFloat(formData.monthlyRate),
        is_featured: false,
        property_id: Date.now().toString() + Math.floor(Math.random() * 10000).toString(),
        owner_id:  Date.now().toString() + Math.floor(Math.random() * 10000).toString(),
      },
      amenities: formData.amenities,
      images: formData.images
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 基本信息 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">基本信息</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">房源标题</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="请输入房源标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">房源描述</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              required
              placeholder="请详细描述房源信息"
            />
          </div>
        </div>
      </div>

      {/* 位置信息 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">位置信息</h2>
        <AddressSelector
          onChange={(address) => {
            setFormData(prev => ({
              ...prev,
              address
            }));
          }}
          value={formData.address}
        />
      </div>

      {/* 房源详情 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">房源详情</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">房源类型</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择房源类型</option>
              {typeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">楼层</label>
            <select
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择楼层</option>
              {floorOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">朝向</label>
            <select
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择朝向</option>
              {directionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">装修程度</label>
            <select
              name="decorate"
              value={formData.decorate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择装修程度</option>
              {decorateOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">户型</label>
            <input
              type="text"
              name="houseType"
              value={formData.houseType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="例如：2室1厅1卫"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">面积(平方米)</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
              step="0.01"
              placeholder="请输入面积"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">月租(元)</label>
            <input
              type="number"
              name="monthlyRate"
              value={formData.monthlyRate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
              step="100"
              placeholder="请输入月租"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">卧室数量</label>
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              min="1"
              placeholder="请输入卧室数量"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">卫生间数量</label>
            <input
              type="number"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              min="1"
              placeholder="请输入卫生间数量"
            />
          </div>
        </div>
      </div>

      {/* 配套设施 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">配套设施</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenitiesOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.amenities.includes(option.value)}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 房东信息 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">房东信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              name="sellerEmail"
              value={formData.sellerEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
            <input
              type="tel"
              name="sellerPhone"
              value={formData.sellerPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="请输入电话"
            />
          </div>
        </div>
      </div>

      {/* 房源图片 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">房源图片</h2>
        <ImageUpload
          onChange={(images) => setFormData(prev => ({ ...prev, images }))}
          maxFiles={5}
        />
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
} 
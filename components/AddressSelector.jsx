'use client';
import React, { useState, useEffect } from 'react';
import { getProvinces, getCities, getDistricts, getStreets } from '@/apis/district.api';

const AddressSelector = ({ onChange, value }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  // 获取省份列表
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('获取省份列表失败:', error);
      }
    };
    fetchProvinces();
  }, []);

  // 获取城市列表
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvince) {
        setCities([]);
        return;
      }
      try {
        const data = await getCities(selectedProvince);
        setCities(data);
      } catch (error) {
        console.error('获取城市列表失败:', error);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  // 获取区县列表
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedCity) {
        setDistricts([]);
        return;
      }
      try {
        const data = await getDistricts(selectedCity);
        setDistricts(data);
      } catch (error) {
        console.error('获取区县列表失败:', error);
      }
    };
    fetchDistricts();
  }, [selectedCity]);

  // 获取街道列表
  useEffect(() => {
    const fetchStreets = async () => {
      if (!selectedDistrict) {
        setStreets([]);
        return;
      }
      try {
        const data = await getStreets(selectedDistrict);
        setStreets(data);
      } catch (error) {
        console.error('获取街道列表失败:', error);
      }
    };
    fetchStreets();
  }, [selectedDistrict]);

  // 当选择改变时，更新父组件的值
  useEffect(() => {
    const fullAddress = {
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
      street: selectedStreet,
      detail: detailAddress
    };
    onChange?.(fullAddress);
  }, [selectedProvince, selectedCity, selectedDistrict, selectedStreet, detailAddress]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">省份</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedCity('');
              setSelectedDistrict('');
              setSelectedStreet('');
            }}
          >
            <option value="">请选择省份</option>
            {provinces.map((province) => (
              <option key={province.code || province.name} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">城市</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedDistrict('');
              setSelectedStreet('');
            }}
            disabled={!selectedProvince}
          >
            <option value="">请选择城市</option>
            {cities.map((city) => (
              <option key={city.code || city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">区县</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedStreet('');
            }}
            disabled={!selectedCity}
          >
            <option value="">请选择区县</option>
            {districts.map((district, index) => (
              <option key={district.code || district.name || `district-${index}`} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">街道</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedStreet}
            onChange={(e) => setSelectedStreet(e.target.value)}
            disabled={!selectedDistrict}
          >
            <option value="">请选择街道</option>
            {streets.map((street, index) => (
              <option key={street.code || street.name || `street-${index}`} value={street.name}>
                {street.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">详细地址</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="请输入详细地址"
        />
      </div>
    </div>
  );
};

export default AddressSelector; 





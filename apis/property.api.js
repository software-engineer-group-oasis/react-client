import {BASE_URL, DEFAULT_CONFIG} from './config';

// 添加缺失的 addProperty 函数
export const addProperty = async (propertyData) => {
    try {
        const response = await fetch(`${BASE_URL}/properties`, {
            ...DEFAULT_CONFIG,
            body: JSON.stringify(propertyData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('添加房产信息失败:', error);
        throw error;
    }
};

export const getPropertyById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/properties/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('获取房产信息失败:', error);
      throw error;
    }
  };

export const getProperties = async() => {
    try {
        const res = await fetch(`${BASE_URL}/properties`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error('获取房产信息失败:', error);
        throw error;
    }
}

export const sendMessageToChatbot = async(userInput, data) => {
    try {
        const postData = {
            message: userInput,
            json_data: JSON.stringify(data),
        }
        const res = await fetch(`${BASE_URL}/deepseek`, {
            ...DEFAULT_CONFIG,
            body: JSON.stringify(postData),
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getPropertiesByLocation = async(province, city) => {
    try {
        const res = await fetch(`${BASE_URL}/properties/search?province=${province}&city=${city}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.log("获取房源信息出错", error);
        throw error;
    }
}

export const deleteProperty = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/properties/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('删除房产信息失败:', error);
        throw error;
    }
};
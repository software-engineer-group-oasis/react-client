import {BASE_URL, DEFAULT_CONFIG} from './config';

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
export const getPropertyById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/properties/${id}`);
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
        const res = await fetch(`http://localhost:5000/api/v1/properties`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error('获取房产信息失败:', error);
        throw error;
    }
}
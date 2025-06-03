'use client';
import { useRouter } from 'next/navigation';
import { addProperty } from '@/apis/property.api';
import PropertyForm from '@/components/PropertyForm';
import toast, { Toaster } from 'react-hot-toast';

export default function PropertiesAdd() {
  const router = useRouter();
  const userObj = JSON.parse(localStorage.getItem('user'))
  console.log("useObj", userObj);
  if ("renter_id" in userObj) {
    toast.error('你不是房东，无法发布房源')
    setTimeout(()=> {
      router.push('/login')

    }, 300);
  }

  const handleSubmit = async (data) => {
    try {
      const response = await addProperty(data);
      if (response.success) {
        toast.success('房源添加成功！');
        router.push('/properties');
      }
    } catch (error) {
      toast.error(`添加失败: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">发布房源</h1>
            <p className="mt-2 text-sm text-gray-600">请填写以下信息来发布您的房源</p>
          </div>
          <Toaster position="top-center" />
          <PropertyForm onSubmit={handleSubmit} submitText="发布房源" />
        </div>
      </div>
    </div>
  );
}
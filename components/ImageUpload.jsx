'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ImageUpload({ onChange, maxFiles = 5 }) {
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files) => {
    if (files.length > maxFiles) {
      toast.error(`最多只能上传${maxFiles}张图片`);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });
      
      const response = await fetch('http://localhost:5000/api/v1/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = (await response.json()).data;
      console.log(data)
      const newImages = data.map((url, index) => ({
        image_url: url,
        sort_order: preview.length + index
      }));
      
      const updatedPreview = [...preview, ...newImages];
      setPreview(updatedPreview);
      onChange(updatedPreview);
    } catch (error) {
      toast.error('图片上传失败');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newPreview = preview.filter((_, i) => i !== index);
    setPreview(newPreview);
    onChange(newPreview);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">点击上传</span> 或拖拽图片
            </p>
            <p className="text-xs text-gray-500">支持 JPG, PNG, GIF (最多{maxFiles}张)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            multiple 
            accept="image/*"
            onChange={e => handleUpload(e.target.files)} 
          />
        </label>
      </div>

      {uploading && (
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">上传中...</span>
        </div>
      )}

      {preview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preview.map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image.image_url} 
                className="w-full h-32 object-cover rounded-lg shadow-sm"
                alt={`预览图 ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
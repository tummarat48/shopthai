'use client';
import { useState } from 'react';

export default function AIProductDescription({ product }: { product: any }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({ 
          product, 
          prompt: "เขียนคำอธิบายสินค้าสไตล์รีวิวที่น่าเชื่อถือและน่าซื้อสำหรับคนไทย" 
        }),
      });
      const data = await res.json();
      setDescription(data.text);
    } catch (e) {
      setDescription("AI กำลังมีปัญหา กรุณาลองใหม่");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 border rounded-2xl p-6">
      {description ? (
        <p className="leading-relaxed">{description}</p>
      ) : (
        <button 
          onClick={generateAI}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-medium"
        >
          {loading ? "AI กำลังคิด..." : "กดเพื่อให้ AI วิเคราะห์สินค้า"}
        </button>
      )}
    </div>
  );
}

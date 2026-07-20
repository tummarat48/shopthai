'use client';

import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // ดึงข้อมูลตะกร้าปัจจุบันจาก localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // ตรวจสอบว่าสินค้ามีอยู่ในตะกร้าแล้วหรือไม่
      const existingIndex = cart.findIndex((item: Product) => item.id === product.id);
      
      if (existingIndex >= 0) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      // บันทึกกลับลง localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว!');
    } catch (err) {
      console.error('เกิดข้อผิดพลาด:', err);
      alert('ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:bg-blue-300"
    >
      {isLoading ? 'กำลังเพิ่ม...' : 'เพิ่มลงตะกร้าสินค้า'}
    </button>
  );
}

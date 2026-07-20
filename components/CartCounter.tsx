'use client';

import { useState, useEffect } from 'react';

export default function CartCounter() {
  const [totalItems, setTotalItems] = useState(0);

  // อ่านค่าจาก localStorage ตอนโหลดหน้า
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      setTotalItems(count);
    };

    updateCount();
    // ฟังเหตุการณ์เมื่อตะกร้าสินค้าเปลี่ยนแปลง
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  // อัปเดตทันทีเมื่อเพิ่มสินค้า
  useEffect(() => {
    const interval = setInterval(() => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      setTotalItems(count);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (totalItems === 0) return null;

  return (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {totalItems}
    </span>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Product } from '@/data/products';

type CartItem = Product & { quantity: number };

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // โหลดข้อมูลตะกร้าจาก localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shopthai_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (err) {
      console.error('โหลดตะกร้าไม่สำเร็จ:', err);
    }
  }, []);

  // บันทึกข้อมูลตะกร้า
  useEffect(() => {
    localStorage.setItem('shopthai_cart', JSON.stringify(cart));
  }, [cart]);

  // เพิ่มจำนวนสินค้า
  const increaseQty = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ลดจำนวนสินค้า
  const decreaseQty = (id: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // ลบสินค้าทั้งรายการ
  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // คำนวณราคารวม
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* ปุ่มเปิดตะกร้า */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
      >
        🛒 ตะกร้า
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* แผงตะกร้า */}
      {isOpen && (
        <>
          {/* พื้นหลังมืด */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* กล่องตะกร้า */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
            {/* ส่วนหัว */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">ตะกร้าสินค้า ({totalItems})</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                ×
              </button>
            </div>

            {/* รายการสินค้า */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-4xl mb-4">🛒</p>
                  <p>ตะกร้าว่างอยู่</p>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="inline-block mt-4 text-orange-600 hover:underline"
                  >
                    กลับไปเลือกสินค้า
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-6">
                      {/* ✅ แก้ img → image ตรงกับโครงสร้างข้อมูล */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                        <p className="text-orange-600 font-semibold mt-1">
                          ฿{item.price.toLocaleString()}
                        </p>

                        {/* ตัวควบคุมจำนวน */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* ปุ่มลบ */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 text-lg flex-shrink-0"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ส่วนท้าย ราคารวมและปุ่ม */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>รวมทั้งหมด</span>
                  <span className="text-orange-600">฿{totalPrice.toLocaleString()}</span>
                </div>

                <a
                  href={cart[0]?.offerUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold rounded-xl transition-colors"
                >
                  ไปซื้อสินค้าต้นทาง →
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

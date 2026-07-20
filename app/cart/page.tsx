'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  offerUrl: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, mounted]);

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (!mounted) return <div className="container mx-auto p-4">กำลังโหลดตะกร้า...</div>;

  return (
    <div className="container mx-auto p-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">ตะกร้าสินค้า ({totalQty} ชิ้น)</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 border rounded-xl">
          <p className="text-gray-500 mb-4">ยังไม่มีสินค้าในตะกร้า</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block">
            เลือกซื้อสินค้า
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* รายการสินค้า */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-xl">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                  <p className="text-red-600 font-semibold mt-1">฿{item.price.toLocaleString()}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border">-</button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">ลบ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* สรุปคำสั่งซื้อ */}
          <div className="h-fit border rounded-xl p-6">
            <h2 className="font-bold mb-4">สรุปรายการ</h2>
            <div className="flex justify-between mb-2">
              <span>รวม {totalQty} ชิ้น</span>
              <span>฿{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mb-6 pt-4 border-t">
              <span>ทั้งหมด</span>
              <span className="text-red-600">฿{total.toLocaleString()}</span>
            </div>

            {/* ปุ่มสั่งซื้อแต่ละชิ้น */}
            <div className="space-y-2">
              {cart.map(item => (
                <a
                  key={item.id}
                  href={item.offerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-green-600 hover:bg-green-700 text-white text-center text-sm rounded-lg transition-colors"
                >
                  สั่งซื้อ {item.name.slice(0, 15)}...
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

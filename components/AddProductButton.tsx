'use client';

import { useState } from 'react';
// นำเข้าประเภทให้ถูกต้อง
import type { Product } from '@/data/products';

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    try {
      // ดึงข้อมูลตะกร้าจาก localStorage
      const cart = JSON.parse(localStorage.getItem('shopthai_cart') || '[]');
      
      // ตรวจสอบว่ามีสินค้านี้แล้วหรือไม่
      const existingIndex = cart.findIndex((item: any) => item.id === product.id);

      if (existingIndex >= 0) {
        // เพิ่มจำนวน
        cart[existingIndex].quantity += 1;
      } else {
        // เพิ่มสินค้าใหม่
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          imageUrl: product.imageUrl,
          offerUrl: product.offerUrl,
          quantity: 1
        });
      }

      // บันทึกกลับ
      localStorage.setItem('shopthai_cart', JSON.stringify(cart));
      
      // แจ้งผลสำเร็จ
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('เพิ่มสินค้าไม่สำเร็จ:', err);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={added}
      className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-green-500 text-white font-semibold rounded-xl transition-colors"
    >
      {added ? '✅ เพิ่มลงตะกร้าแล้ว' : 'เพิ่มลงตะกร้า'}
    </button>
  );
}

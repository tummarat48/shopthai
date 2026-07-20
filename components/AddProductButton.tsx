'use client';

import { useState } from 'react';
// ✅ นำเข้าประเภท Product ที่ตรงกัน
import type { Product } from '@/data/products';

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('shopthai_cart') || '[]');
      const existingIndex = cart.findIndex((item: any) => item.id === product.id);

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          // ✅ ใช้ฟิลด์ image ที่มีอยู่
          image: product.image,
          offerUrl: product.offerUrl,
          quantity: 1
        });
      }

      localStorage.setItem('shopthai_cart', JSON.stringify(cart));
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

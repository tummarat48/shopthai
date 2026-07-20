// ✅ บรรทัดแรกสุดของไฟล์
'use client';

import { useState } from 'react';
import type { AffiliateProduct } from '@/data/products';

export default function AddToCartBtn({ product }: { product: AffiliateProduct }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exist = cart.find((i: any) => i.id === product.id);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors disabled:bg-green-600"
    >
      {added ? '✅ เพิ่มแล้ว' : 'เพิ่มลงตะกร้า'}
    </button>
  );
}

// ✅ บรรทัดแรกสุด: นำเข้าทั้งหมดก่อน
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { affiliateProducts, type AffiliateProduct } from '@/data/products';
import AddToCartBtn from '@/components/AddProductButton';

// ✅ แยกคอมโพเนนต์ Client ออกไป หรือวาง 'use client' ให้ถูกที่
// วิธีที่ดีที่สุด: สร้างไฟล์แยก หรือย้าย 'use client' ขึ้นบนสุด
// แก้ไขโดยการย้ายปุ่มไปไว้ไฟล์แยกดีกว่าครับ จะได้ไม่ปนกัน

// ====== ส่วน Server Component (แสดงรายการ) ======
export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">สินค้าทั้งหมด</h1>
        <p className="text-gray-600">เลือกช้อปสินค้าคุณภาพ พร้อมรับค่าคอมมิชชันพิเศษ</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {affiliateProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// การ์ดสินค้า (Server Component)
function ProductCard({ product }: { product: AffiliateProduct }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          คอมฯ {product.commissionRate}%
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-red-600">฿{product.price.toLocaleString()}</span>
          <span className="text-xs text-gray-500">/ ชิ้น</span>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-3">
          <span>ขายแล้ว {product.sales}</span>
          <span className="mx-2">•</span>
          <span>ร้าน: {product.shopName}</span>
        </div>

        {/* เรียกใช้คอมโพเนนต์ปุ่มที่แยกไฟล์แล้ว */}
        <AddToCartBtn product={product} />
      </div>
    </div>
  );
}

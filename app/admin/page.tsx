'use client';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [stats, setStats] = useState({
    totalSales: 12450,
    commissions: 2480,
    orders: 87,
    topProduct: "หูฟังไร้สาย"
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📊 Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">รายได้รวม (เดือนนี้)</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.commissions.toLocaleString()} บาท</p>
        </div>
        {/* เพิ่มการ์ดอื่น ๆ ได้ */}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">สินค้าขายดี</h2>
        {/* ตารางสินค้า + ปุ่ม Sync จาก API */}
      </div>
    </div>
  );
}

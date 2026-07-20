'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all group border border-gray-100">
      <div className="relative h-56 bg-gray-100">
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-bold rounded-full text-orange-600 shadow">
          Shopee
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.2em]">
          {product.name}
        </h3>
        
        <p className="text-3xl font-bold text-orange-600 mt-4">
          {product.price.toLocaleString()} บาท
        </p>

        <div className="flex gap-3 mt-8">
          <Link 
            href={`/products/${product.id}`}
            className="flex-1 text-center border border-orange-600 text-orange-600 py-3.5 rounded-2xl hover:bg-orange-50 font-medium transition"
          >
            รายละเอียด
          </Link>
          
          <a 
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 font-medium transition"
          >
            ซื้อเลย 
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* รูปสินค้า */}
      <div className="relative h-56 bg-gray-100">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-medium">
          {product.platform}
        </span>
      </div>

      {/* รายละเอียด */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xl font-bold text-orange-600">
              ฿{product.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">ขายแล้ว {product.sales}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-600 font-medium">
              คอมฯ {product.commissionRate}%
            </p>
            <p className="text-xs text-green-600">
              ฿{product.commissionAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-4">ร้าน: {product.shopName}</p>

        <Link
          href={`/products/${product.id}`}
          className="block w-full py-2 text-center bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm font-medium rounded-lg transition-colors"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}

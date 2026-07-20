import { affiliateProducts, type AffiliateProduct } from '@/data/products';

// ดึงสินค้าทั้งหมด
export function getAllProducts(): AffiliateProduct[] {
  return affiliateProducts;
}

// ดึงสินค้าตามรหัส
export function getProductById(id: string): AffiliateProduct | undefined {
  return affiliateProducts.find(product => product.id === id);
}

// ดึงสินค้าตามชื่อ (สำหรับค้นหา)
export function searchProducts(keyword: string): AffiliateProduct[] {
  const lowerKeyword = keyword.toLowerCase();
  return affiliateProducts.filter(product => 
    product.name.toLowerCase().includes(lowerKeyword) ||
    product.shopName.toLowerCase().includes(lowerKeyword)
  );
}

// ดึงสินค้าขายดี
export function getBestSellingProducts(limit = 10): AffiliateProduct[] {
  return affiliateProducts.slice(0, limit);
}

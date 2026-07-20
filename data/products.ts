export type AffiliateProduct = {
  id: string;
  name: string;
  price: number;
  sales: string;
  shopName: string;
  commissionRate: number;
  commissionAmount: number;
  productUrl: string;
  offerUrl: string;
  imageUrl: string;
  platform: 'Shopee' | 'Lazada' | 'TikTok';
};

// ข้อมูลสินค้าทั้งหมด
export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "29401703698",
    name: "หูฟังไร้สาย",
    price: 890,
    sales: "90พัน+",
    shopName: "Shopee",
    commissionRate: 12,
    commissionAmount: 106.8,
    productUrl: "https://shopee.co.th/product/1019521485/29401703698",
    offerUrl: "https://s.shopee.co.th/BSLrASdCp",
    imageUrl: "https://picsum.photos/id/1/400/300",
    platform: "Shopee"
  },
  {
    id: "24440905432",
    name: "ครีมกันแดด",
    price: 450,
    sales: "10พัน+",
    shopName: "Lazada",
    commissionRate: 17,
    commissionAmount: 76.5,
    productUrl: "https://shopee.co.th/product/406732499/24440905432",
    offerUrl: "https://s.shopee.co.th/2LWqR9KNoG",
    imageUrl: "https://picsum.photos/id/26/400/300",
    platform: "Lazada"
  },
  {
    id: "24440905433",
    name: "เสื้อยืด oversize",
    price: 299,
    sales: "5พัน+",
    shopName: "TikTok",
    commissionRate: 10,
    commissionAmount: 29.9,
    productUrl: "https://shopee.co.th/product/406732499/24440905433",
    offerUrl: "https://s.shopee.co.th/2LWqR9KNoG",
    imageUrl: "https://picsum.photos/id/64/400/300",
    platform: "TikTok"
  }
];

// ข้อมูลร้านค้า
export const affiliateShops = [
  { id: "1", name: "AD เทคโนโลยีความงามและอุปกรณ์ท", maxCommission: 82, url: "https://shopee.co.th/shop/1600612362" },
];

// ✅ เพิ่มฟังก์ชันที่หายไป
export function getAllProducts(): AffiliateProduct[] {
  return affiliateProducts;
}

export function getProductById(id: string): AffiliateProduct | undefined {
  return affiliateProducts.find(product => product.id === id);
}

export function searchProducts(keyword: string): AffiliateProduct[] {
  const lowerKeyword = keyword.toLowerCase();
  return affiliateProducts.filter(product => 
    product.name.toLowerCase().includes(lowerKeyword) ||
    product.shopName.toLowerCase().includes(lowerKeyword)
  );
}

export function getBestSellingProducts(limit = 10): AffiliateProduct[] {
  return affiliateProducts.slice(0, limit);
}

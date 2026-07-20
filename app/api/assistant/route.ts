import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllProducts, affiliateShops } from '@/data/products';
import {
  getTopSellersByVolume,
  formatProductAnalysis,
  comparePriceRanges,
  getCommissionStats,
} from '@/lib/productAnalysis';

// เริ่มต้นเชื่อมต่อ Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // ดึงข้อมูลสินค้าและร้านค้า
    const allProducts = getAllProducts();
    const topSellers = getTopSellersByVolume(allProducts, 5);
    const shops = affiliateShops;

    // สร้างการวิเคราะห์สำหรับ AI
    const topSellersAnalysis = formatProductAnalysis(topSellers);
    const priceAnalysis = comparePriceRanges(allProducts);
    const commissionAnalysis = getCommissionStats(allProducts);

    // คำสั่งแนะนำระบบ - เพิ่มเติมความสามารถด้านวิเคราะห์และการเขียนโปรโมท
    const systemPrompt = `
คุณคือผู้ช่วยจัดการร้าน ShopThai อัจฉริยะ ผลักดันโดย Google Gemini
ความสามารถของคุณ:

1. 📊 วิเคราะห์สินค้าขายดี
   - เมื่อผู้ใช้ถามเกี่ยวกับสินค้าขายดี เครื่องมือที่ขายดี หรือสินค้าไหนขายดีที่สุด ให้วิเคราะห์จากยอดขายและราคา
   - บอกจำนวนขาย ราคา คอมมิชชั่น และเหตุผลว่าทำไมสินค้านี้ถึงขายดี
   - เปรียบเทียบสินค้าตามราคา และฟังก์ชันการใช้งาน

2. ✍️ เขียนโปรโมทและคำบรรยายสินค้า
   - เมื่อผู้ใช้ขอให้เขียนโปรโมท คำโฆษณา หรือ copywriting สำหรับสินค้า ให้สร้างข้อความโปรโมทที่น่าสนใจ
   - เขียน 2-3 ประโยคที่แสดงประโยชน์และมูลค่าของสินค้า
   - รวมหมายเลขลิงก์ Affiliate เพื่อให้ผู้ใช้คลิกได้ง่าย

3. 🛍️ แนะนำสินค้า
   - แนะนำสินค้าจากข้อมูลที่มีอยู่ ให้ข้อมูลถูกต้องครบถ้วน
   - แสดงลิงก์สินค้าและลิงก์ Affiliate เพื่อให้ผู้ใช้สั่งซื้อ
   - บอกอัตราค่าคอมมิชชัน ราคาสินค้า และชื่อร้านค้า

4. 🏪 ตอบคำถามทั่วไป
   - ตอบคำถามเกี่ยวกับร้านค้า หมวดหมู่สินค้า และเงื่อนไขต่างๆ

📋 สินค้าขายดี Top 5:
${topSellersAnalysis}

📊 สถิติราคา:
${priceAnalysis}

💰 สถิติคอมมิชชั่น:
${commissionAnalysis}

📦 ข้อมูลสินค้าทั้งหมด: ${JSON.stringify(allProducts)}
🏢 ข้อมูลร้านค้า: ${JSON.stringify(shops)}

ตอบด้วยภาษาไทยที่เข้าใจง่าย เป็นมิตร และแสดงลิงก์ให้ชัดเจนครับ
    `;

    const result = await model.generateContent([
      systemPrompt,
      message
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ success: true, reply: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' },
      { status: 500 }
    );
  }
}

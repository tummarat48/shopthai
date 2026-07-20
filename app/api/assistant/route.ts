import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllProducts, affiliateShops } from '@/data/products';

// เริ่มต้นเชื่อมต่อ Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // ดึงข้อมูลสินค้าและร้านค้า
    const allProducts = getAllProducts();
    const shops = affiliateShops;

    // คำสั่งแนะนำระบบ
    const systemPrompt = `
คุณคือผู้ช่วยแนะนำสินค้า Affiliate จาก Shopee
หน้าที่ของคุณ:
1. แนะนำสินค้าจากข้อมูลที่มีอยู่ ให้ข้อมูลถูกต้องครบถ้วน
2. แสดงลิงก์สินค้าและลิงก์ Affiliate เพื่อให้ผู้ใช้สั่งซื้อ
3. บอกอัตราค่าคอมมิชชัน ราคาสินค้า และชื่อร้านค้า
4. ตอบคำถามเกี่ยวกับร้านค้า หมวดหมู่สินค้า และเงื่อนไขต่างๆ

ข้อมูลสินค้าทั้งหมด: ${JSON.stringify(allProducts)}
ข้อมูลร้านค้า: ${JSON.stringify(shops)}

ตอบด้วยภาษาไทยที่เข้าใจง่าย เป็นมิตร และแสดงลิงก์ให้ชัดเจนครับ
    `;

    // ✅ แก้รูปแบบการส่งข้อความให้ถูกต้อง
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

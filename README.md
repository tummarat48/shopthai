# shopthai

โปรเจคตัวอย่างร้านค้าออนไลน์ (Next.js + TypeScript)

[![CI](https://github.com/tummarat48/shopthai/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tummarat48/shopthai/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/tummarat48/shopthai?style=flat-square)](https://github.com/tummarat48/shopthai/releases)

การใช้งานเบื้องต้น

1. ติดตั้ง dependencies

```bash
npm install
```

2. รันโหมดพัฒนา

```bash
npm run dev
```

3. สร้าง build สำหรับ production

```bash
npm run build
npm run start
```

สร้าง release ZIP (โลคอล)

```bash
npm run release
# ผลลัพธ์จะอยู่ในโฟลเดอร์ dist/ เช่น dist/shopthai-20260720123045.zip
```

CI (GitHub Actions)

โปรเจคมี workflow สำหรับ CI ที่จะรันบน `push`/`pull_request` ไปยัง `main` — มันจะติดตั้ง, build, lint และอัปโหลด artifact `shopthai-dist` (ZIP)

ถ้าต้องการให้ผมตั้งค่า Release หรือเพิ่ม badge ให้บอกได้เลย

ไฟล์สำคัญ

- `.gitignore` - รายการไฟล์ที่ไม่ต้องการติดตาม
- `data/ProductCard.tsx` - ตัวอย่างข้อมูลสินค้า

หมายเหตุ

ถ้าต้องการผมสามารถช่วย `git push` ให้ได้ แต่จะต้องมี remote ตั้งค่าไว้ (เช่น `origin`).

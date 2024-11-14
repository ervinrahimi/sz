// src/app/api/upload/saleconditions/route.js

import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request) {
  try {
    const data = await request.formData()
    const files = data.getAll('files') // دریافت تمامی فایل‌ها از درخواست

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    // تنظیم مسیر ذخیره‌سازی فایل‌ها
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'saleconditions')
    await fs.mkdir(uploadDir, { recursive: true })

    const urls = []

    for (const file of files) {
      const buffer = await file.arrayBuffer()
      const bytes = new Uint8Array(buffer)
      const filename = `${uuidv4()}-${file.name}` // تولید نام منحصربه‌فرد برای فایل
      await fs.writeFile(path.join(uploadDir, filename), bytes)
      urls.push(`/uploads/saleconditions/${filename}`) // افزودن مسیر عمومی فایل به آرایه URLs
    }

    return NextResponse.json({ urls }) // بازگرداندن آرایه‌ای از URLهای فایل‌ها
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}

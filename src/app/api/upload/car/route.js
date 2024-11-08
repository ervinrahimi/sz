// src/app/api/upload/route.js

import prisma from '@/db/client'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request) {
  const data = await request.formData()
  const files = data.getAll('files') // استفاده از getAll برای دریافت همه فایل‌ها

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'car')
  await fs.mkdir(uploadDir, { recursive: true })

  const urls = []

  for (const file of files) {
    const buffer = await file.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    const filename = `${uuidv4()}-${file.name}`
    await fs.writeFile(path.join(uploadDir, filename), bytes)
    urls.push(`/uploads/car/${filename}`)
  }

  return NextResponse.json({ urls }) // بازگرداندن آرایه‌ای از URLها
}

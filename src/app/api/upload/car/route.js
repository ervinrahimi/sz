// src/app/api/upload/route.js

import prisma from '@/db/client'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  const filename = `${uuidv4()}-${file.name}`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'car')

  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), bytes)

  const url = `/uploads/car/${filename}`

  return NextResponse.json({ url })
}
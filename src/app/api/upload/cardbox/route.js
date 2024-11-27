import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('imageFile')

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cardBox')
  await fs.mkdir(uploadDir, { recursive: true })

  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  const filename = `${uuidv4()}-${file.name}`
  await fs.writeFile(path.join(uploadDir, filename), bytes)
  const url = `/uploads/cardBox/${filename}`

  return NextResponse.json({ url })
}

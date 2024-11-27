import { promises as fs } from 'fs'
import path from 'path'

export async function deleteFileFromServer(fileUrl) {
  const filePath = path.join(process.cwd(), 'public', fileUrl)
  try {
    await fs.unlink(filePath)
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}

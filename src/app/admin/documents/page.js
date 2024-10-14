// src/app/admin/documents/page.jsx

import prisma from '@/db/client'
import DocumentsTable from '@/components/admin/documents/DocumentsTable'

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      user: true,
    },
  })

  return (
    <div>
      <h1>مدیریت اسناد و مدارک</h1>
      <DocumentsTable documents={documents} />
    </div>
  )
}

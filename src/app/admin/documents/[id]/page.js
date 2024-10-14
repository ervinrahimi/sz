// src/app/admin/documents/[id]/page.jsx

import prisma from '@/db/client'
import DocumentDetails from '@/components/admin/documents/DocumentDetails'

export default async function DocumentDetailsPage({ params }) {
  const documentId = params.id
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: {
      user: true,
      file: true,
    },
  })

  if (!document) {
    return <div>سند یافت نشد</div>
  }

  return (
    <div>
      <h1>جزئیات سند</h1>
      <DocumentDetails document={document} />
    </div>
  )
}

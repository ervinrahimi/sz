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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات سند</h1>
        </div>
        <div className={styles.balanceBox}>
          <DocumentDetails document={document} />
        </div>
      </div>
    </div>
  )
}

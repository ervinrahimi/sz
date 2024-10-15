// src/app/admin/documents/page.jsx

import prisma from '@/db/client'
import DocumentsTable from '@/components/admin/documents/DocumentsTable'
import styles from '../page.module.css'

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      user: true,
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت اسناد و مدارک</h1>
        </div>
        <div className={styles.balanceBox}>
          <DocumentsTable documents={documents} />
        </div>
      </div>
    </div>
  )
}

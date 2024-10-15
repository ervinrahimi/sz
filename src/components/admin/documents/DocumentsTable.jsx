// src/components/admin/documents/DocumentsTable.jsx

'use client'

import Link from 'next/link'
import styles from './DocumentsTable.module.css'

export default function DocumentsTable({ documents }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد سند</div>
        <div className={styles.headerCell}>کاربر</div>
        <div className={styles.headerCell}>نوع سند</div>
        <div className={styles.headerCell}>وضعیت</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {documents.map((doc) => (
          <div key={doc.id} className={styles.row}>
            <div className={styles.cell}>{doc.id}</div>
            <div className={styles.cell}>
              {doc.user.name} {doc.user.family}
            </div>
            <div className={styles.cell}>{getDocumentType(doc.type)}</div>
            <div className={styles.cell}>{getDocumentStatus(doc.status)}</div>
            <div className={styles.cell}>
              <Link href={`/admin/documents/${doc.id}`}>
                <button className={styles.button}>بررسی</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getDocumentType(type) {
  switch (type) {
    case 'NATIONAL_ID':
      return 'کارت ملی'
    case 'BIRTH_CERTIFICATE':
      return 'شناسنامه'
    case 'OTHER':
      return 'سایر'
    default:
      return ''
  }
}

function getDocumentStatus(status) {
  switch (status) {
    case 'PENDING':
      return 'در انتظار بررسی'
    case 'CONFIRMED':
      return 'تایید شده'
    case 'REJECTED':
      return 'رد شده'
    default:
      return ''
  }
}

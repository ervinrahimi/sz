// src/components/admin/documents/DocumentsTable.jsx

'use client'

import Link from 'next/link'
import styles from './DocumentsTable.module.css'

export default function DocumentsTable({ documents }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>کد سند</th>
          <th>کاربر</th>
          <th>نوع سند</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.id}</td>
            <td>
              {doc.user.name} {doc.user.family}
            </td>
            <td>{getDocumentType(doc.type)}</td>
            <td>{getDocumentStatus(doc.status)}</td>
            <td>
              <Link href={`/admin/documents/${doc.id}`}>بررسی</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

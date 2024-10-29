// src/components/admin/documents/DocumentDetails.jsx

'use client'

import { useState } from 'react'

import styles from './DocumentDetails.module.css'
import { updateDocumentStatus } from '@/actions/admin/documents'
import { useRouter } from 'next/navigation'

export default function DocumentDetails({ document }) {
  const [status, setStatus] = useState(document.status)
  const router = useRouter()

  const handleStatusChange = async (newStatus) => {
    await updateDocumentStatus(document.id, newStatus)
    setStatus(newStatus)
    router.refresh()
  }

  return (
    <div className={styles.documentDetails}>
      <p>کد سند: {document.id}</p>
      <p>
        کاربر: {document.user.name} {document.user.family}
      </p>
      <p>نوع سند: {getDocumentType(document.type)}</p>
      <p>وضعیت: {getDocumentStatus(status)}</p>
      {/* نمایش فایل سند */}
      <h3>فایل سند</h3>
      <a href={document.file.url} target="_blank" rel="noopener noreferrer">
        {document.file.filename}
      </a>
      {/* دکمه‌های تغییر وضعیت */}
      <button onClick={() => handleStatusChange('CONFIRMED')}>تایید</button>
      <button onClick={() => handleStatusChange('REJECTED')}>رد</button>
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

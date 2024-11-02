// src/components/admin/cardBoxSections/CardBoxSectionsList.jsx

'use client'

import Link from 'next/link'
import styles from './CardBoxSectionsList.module.css'
import { useState } from 'react'
import { deleteCardBoxSection } from '@/actions/admin/cardBoxSections'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CardBoxSectionsList({ sections }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (id) => {
    if (confirm('آیا از حذف این بخش مطمئن هستید؟')) {
      setIsDeleting(true)
      await deleteCardBoxSection(id)
      setIsDeleting(false)
      toast.success('بخش کارت باکس انتخابی شما با موفقیت حذف گردید', { duration: 5000 })
      router.refresh()
    }
  }

  return (
    <div>
      <Link href="/admin/card-box-sections/create" className={styles.createButton}>
        ساختن بخش جدید
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام بخش</th>
            <th>تاریخ بروزرسانی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section.id}>
              <td>{section.name}</td>
              <td>{new Date(section.updatedAt).toLocaleDateString('fa-IR')}</td>
              <td>
                <Link href={`/admin/card-box-sections/${section.id}/edit`}>ویرایش</Link> |{' '}
                <button onClick={() => handleDelete(section.id)} disabled={isDeleting}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

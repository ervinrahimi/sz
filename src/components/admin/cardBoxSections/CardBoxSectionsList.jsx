// src/components/admin/cardBoxSections/CardBoxSectionsList.jsx

'use client'

import Link from 'next/link'
import styles from './CardBoxSectionsList.module.css'
import { useState } from 'react'
import {
  deleteCardBoxSection,
  moveSectionUp,
  moveSectionDown,
} from '@/actions/admin/cardBoxSections'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CardBoxSectionsList({ sections }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleDelete = async (id) => {
    if (confirm('آیا از حذف این بخش مطمئن هستید؟')) {
      setIsProcessing(true)
      await deleteCardBoxSection(id)
      setIsProcessing(false)
      toast.success('بخش کارت باکس انتخابی شما با موفقیت حذف گردید', { duration: 5000 })
      router.refresh()
    }
  }

  const handleMoveUp = async (id) => {
    setIsProcessing(true)
    await moveSectionUp(id)
    setIsProcessing(false)
    router.refresh()
  }

  const handleMoveDown = async (id) => {
    setIsProcessing(true)
    await moveSectionDown(id)
    setIsProcessing(false)
    router.refresh()
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
            <th>ترتیب</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section.id}>
              <td>{section.name}</td>
              <td>{new Date(section.updatedAt).toLocaleDateString('fa-IR')}</td>
              <td>
                <button onClick={() => handleMoveUp(section.id)} disabled={isProcessing}>
                  بالا
                </button>
                <button onClick={() => handleMoveDown(section.id)} disabled={isProcessing}>
                  پایین
                </button>
              </td>
              <td>
                <Link href={`/admin/card-box-sections/${section.id}/edit`}>ویرایش</Link> |{' '}
                <button onClick={() => handleDelete(section.id)} disabled={isProcessing}>
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

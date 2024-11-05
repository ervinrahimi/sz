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
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>نام بخش</div>
        <div className={styles.headerCell}>تاریخ بروزرسانی</div>
        <div className={styles.headerCell}>ترتیب</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {sections.map((section) => (
          <div key={section.id} className={styles.row}>
            <div className={styles.cell}>{section.name}</div>
            <div className={styles.cell}>{new Date(section.updatedAt).toLocaleDateString('fa-IR')}</div>
            <div className={styles.cell}>
              <button
                onClick={() => handleMoveUp(section.id)}
                disabled={isProcessing}
                className={styles.button}
              >
                بالا
              </button>
              <button
                onClick={() => handleMoveDown(section.id)}
                disabled={isProcessing}
                className={styles.button}
              >
                پایین
              </button>
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/card-box-sections/${section.id}/edit`} className={styles.link}>
                ویرایش
              </Link>
              <button
                onClick={() => handleDelete(section.id)}
                disabled={isProcessing}
                className={styles.buttonDelete}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

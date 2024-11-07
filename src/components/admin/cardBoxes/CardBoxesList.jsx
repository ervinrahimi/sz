// src/components/admin/cardBoxes/CardBoxesList.jsx

'use client'

import Link from 'next/link'
import styles from './CardBoxesList.module.css'
import { useState } from 'react'
import { deleteCardBox } from '@/actions/admin/cardBoxes'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CardBoxesList({ sections }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (id) => {
    if (confirm('آیا از حذف این کارت باکس مطمئن هستید؟')) {
      setIsDeleting(true)
      await deleteCardBox(id)
      setIsDeleting(false)
      toast.success('کارت باکس انتخابی شما با موفقیت حذف گردید', { duration: 5000 })
      router.refresh()
    }
  }

  return (
    <div className={styles.cardBoxList}>
      {sections?.map((section) => (
        <>
          <h2>{section.name}</h2>
          <div className={styles.cardBoxListItem}>
          {section?.cardBoxes?.map((cardBox) => (
            <>
              <div>
                <div key={cardBox.id} className={styles.cardBox}>
                  <div className={styles.cardBoxItem}>
                    <span className={styles.label}>عنوان کارت باکس:</span>
                    <span className={styles.value}>{cardBox.title}</span>
                  </div>
                  <div className={styles.cardBoxItem}>
                    <span className={styles.label}>بخش:</span>
                    <span className={styles.value}>{section.name}</span>
                  </div>
                  <div className={styles.cardBoxItem}>
                    <span className={styles.label}>خودرو:</span>
                    <span className={styles.value}>{cardBox.car.name}</span>
                  </div>
                  <div className={styles.cardBoxItem}>
                    <span className={styles.label}>تاریخ بروزرسانی:</span>
                    <span className={styles.value}>
                      {new Date(cardBox.updatedAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                  <div className={styles.actions}>
                    <Link href={`/admin/card-boxes/${cardBox.id}/edit`}>
                      <button className={styles.editButton}>ویرایش</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(cardBox.id)}
                      disabled={isDeleting}
                      className={styles.deleteButton}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
          </div>
        </>
      ))}
    </div>
  )
}

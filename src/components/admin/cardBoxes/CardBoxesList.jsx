// src/components/admin/cardBoxes/CardBoxesList.jsx

'use client'

import Link from 'next/link'
import styles from './CardBoxesList.module.css'
import { useState } from 'react'
import { deleteCardBox } from '@/actions/admin/cardBoxes'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CardBoxesList({ cardBoxes }) {
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
    <div>
      <Link href="/admin/card-boxes/create" className={styles.createButton}>
        ساختن کارت باکس جدید
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>عنوان کارت باکس</th>
            <th>بخش</th>
            <th>خودرو</th>
            <th>تاریخ بروزرسانی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {cardBoxes.map((cardBox) => (
            <tr key={cardBox.id}>
              <td>{cardBox.title}</td>
              <td>{cardBox.section.name}</td>
              <td>{cardBox.car.name}</td>
              <td>{new Date(cardBox.updatedAt).toLocaleDateString('fa-IR')}</td>
              <td>
                <Link href={`/admin/card-boxes/${cardBox.id}/edit`}>ویرایش</Link> |{' '}
                <button onClick={() => handleDelete(cardBox.id)} disabled={isDeleting}>
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

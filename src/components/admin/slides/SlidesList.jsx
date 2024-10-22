// src/components/admin/slides/SlidesList.jsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './SlidesList.module.css'
import { deleteSlide, reorderSlides } from '@/actions/admin/slides'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SlidesList({ slides }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (id) => {
    if (confirm('آیا از حذف این اسلاید مطمئن هستید؟')) {
      setIsDeleting(true)
      await deleteSlide(id)
      setIsDeleting(false)
      router.refresh()
    }
  }

  // جابجایی اسلایدها (این بخش نیاز به پیاده‌سازی قابلیت درگ اند دراپ دارد)

  return (
    <div>
      <Link href="/admin/slides/create" className={styles.createButton}>
        ساختن اسلاید جدید
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ترتیب</th>
            <th>عنوان</th>
            <th>تصویر</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {slides.map((slide) => (
            <tr key={slide.id}>
              <td>{slide.order}</td>
              <td>{slide.title}</td>
              <td>
                <Image src={slide.imageUrl} alt={slide.title} className={styles.thumbnail} width={100} height={100} />
              </td>
              <td>
                <Link href={`/admin/slides/${slide.id}/edit`}>ویرایش</Link> |{' '}
                <button onClick={() => handleDelete(slide.id)} disabled={isDeleting}>
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

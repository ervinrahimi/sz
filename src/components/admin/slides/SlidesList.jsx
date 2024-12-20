'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './SlidesList.module.css'
import { reorderSlides, deleteSlide } from '@/actions/admin/slides'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function SlidesList({ slides }) {
  const [slideList, setSlideList] = useState(slides)
  const router = useRouter()

  const moveUp = async (index) => {
    if (index === 0) return
    const newList = [...slideList]
    const temp = newList[index]
    newList[index] = newList[index - 1]
    newList[index - 1] = temp

    setSlideList(newList)

    const newOrder = newList.map((slide, i) => ({
      id: slide.id,
      order: i + 1,
    }))
    await reorderSlides(newOrder)
    router.refresh()
  }

  const moveDown = async (index) => {
    if (index === slideList.length - 1) return
    const newList = [...slideList]
    const temp = newList[index]
    newList[index] = newList[index + 1]
    newList[index + 1] = temp

    setSlideList(newList)

    const newOrder = newList.map((slide, i) => ({
      id: slide.id,
      order: i + 1,
    }))
    await reorderSlides(newOrder)
    router.refresh()
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('آیا مطمئن هستید که می‌خواهید این اسلاید را حذف کنید؟')
    if (!confirmDelete) return

    try {
      await deleteSlide(id) // حذف اسلاید از سرور
      const updatedList = slideList.filter((slide) => slide.id !== id)
      setSlideList(updatedList) // به‌روزرسانی لیست پس از حذف
      router.refresh() // به‌روزرسانی صفحه
      toast.success('اسلاید شما با موفقیت حذف شد', { duration: 5000 })
    } catch (error) {
      toast.error('خطا در حذف اسلاید', { duration: 5000 })
      console.error('خطا در حذف اسلاید:', error)
    }
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ترتیب</th>
            <th>عنوان</th>
            <th>عملیات</th>
            <th>جابجایی</th>
          </tr>
        </thead>
        <tbody>
          {slideList.map((slide, index) => (
            <tr key={slide.id}>
              <td>{index + 1}</td>
              <td>{slide.title}</td>
              <td>
                <button className={styles.button}>
                  <Link href={`/admin/slides/${slide.id}/edit`} legacyBehavior>
                    <a>ویرایش</a>
                  </Link>
                </button>
                <button className={styles.button} onClick={() => handleDelete(slide.id)}>
                  حذف
                </button>
              </td>
              <td>
                <button className={styles.button} onClick={() => moveUp(index)}>
                  ⬆️
                </button>
                <button className={styles.button} onClick={() => moveDown(index)}>
                  ⬇️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

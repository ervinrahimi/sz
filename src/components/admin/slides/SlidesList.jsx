'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './SlidesList.module.css'
import { reorderSlides } from '@/actions/admin/slides'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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

  const handleDelete = (id) => {
    // تابع حذف
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

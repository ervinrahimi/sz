'use client'

import { useRouter } from 'next/navigation'
import { deleteSalesFestival } from '@/actions/admin/salesFestivals'
import toast from 'react-hot-toast'
import styles from './SalesFestivalList.module.css'

export default function SalesFestivalList({ festivals }) {
  const router = useRouter()

  const handleDelete = async (id) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این جشنواره را حذف کنید؟')) {
      try {
        await deleteSalesFestival(id)
        toast.success('جشنواره با موفقیت حذف شد!')
        router.refresh() // ریفرش صفحه بلافاصله پس از حذف
      } catch (error) {
        console.error('خطا در حذف جشنواره:', error)
        toast.error('حذف جشنواره با خطا مواجه شد.')
      }
    }
  }

  // تابع کمکی برای قالب‌بندی تاریخ
  const formatDate = (date) => {
    if (!date || isNaN(new Date(date))) return 'تاریخ نامعتبر'
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>نام جشنواره</div>
        <div className={styles.headerCell}>توضیحات</div>
        <div className={styles.headerCell}>تاریخ شروع</div>
        <div className={styles.headerCell}>تاریخ پایان</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {festivals.map((festival) => (
          <div key={festival.id} className={styles.row}>
            {/* نام جشنواره */}
            <div className={styles.cell}>{festival.name || 'نام‌گذاری نشده'}</div>
            {/* توضیحات جشنواره */}
            <div className={styles.cell}>{festival.description || 'بدون توضیحات'}</div>
            {/* تاریخ شروع */}
            <div className={styles.cell}>{formatDate(festival.startDate)}</div>
            {/* تاریخ پایان */}
            <div className={styles.cell}>{formatDate(festival.endDate)}</div>
            {/* عملیات */}
            <div className={styles.cell}>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(festival.id)}
              >
                حذف
              </button>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => router.push(`/admin/sales-festivals/edit/${festival.id}`)}
              >
                ویرایش
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

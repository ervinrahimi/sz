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
            <div className={styles.cell}>{festival.name}</div>
            <div className={styles.cell}>{festival.description}</div>
            <div className={styles.cell}>
              {new Date(festival.startDate).toLocaleDateString('fa-IR')}
            </div>
            <div className={styles.cell}>
              {new Date(festival.endDate).toLocaleDateString('fa-IR')}
            </div>
            <div className={styles.cell}>
              <button
                className={styles.button}
                onClick={() => handleDelete(festival.id)}
              >
                حذف
              </button>
              <button
                className={styles.button}
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

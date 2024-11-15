'use client'

import { useRouter } from 'next/navigation'
import { deleteSalesFestival } from '@/actions/admin/salesFestivals'
import styles from './SalesFestivalList.module.css'
import toast from 'react-hot-toast'

export default function SalesFestivalList({ festivals }) {
  const router = useRouter()

  const handleDelete = async (id) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این جشنواره را حذف کنید؟')) {
      await deleteSalesFestival(id)
      toast.success('جشنواره با موفقیت حذف شد')
      router.refresh()
    }
  }

  return (
    <div>
      <button
        onClick={() => router.push('/admin/sales-festivals/new')}
        className={styles.formButton}
      >
        ایجاد جشنواره جدید
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام جشنواره</th>
            <th>توضیحات</th>
            <th>تاریخ بروزرسانی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {festivals.map((festival) => (
            <tr key={festival.id}>
              <td>{festival.name}</td>
              <td>{festival.description || '-'}</td>
              <td>{new Date(festival.updatedAt).toLocaleDateString('fa-IR')}</td>
              <td>
                <button onClick={() => router.push(`/admin/sales-festivals/${festival.id}/edit`)}>
                  ویرایش
                </button>
                <button onClick={() => handleDelete(festival.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

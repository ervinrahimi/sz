'use client'

import { useRouter } from 'next/navigation'
import { deleteSalesFestival } from '@/actions/admin/salesFestivals'
import toast from 'react-hot-toast'

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
    <div>
      <h1>لیست جشنواره‌ها</h1>

      {/* دکمه ساختن جشنواره */}
      <button
        onClick={() => router.push('/admin/sales-festivals/create')}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ساختن جشنواره جدید
      </button>

      <table>
        <thead>
          <tr>
            <th>نام جشنواره</th>
            <th>توضیحات</th>
            <th>تاریخ شروع</th>
            <th>تاریخ پایان</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {festivals.map((festival) => (
            <tr key={festival.id}>
              <td>{festival.name}</td>
              <td>{festival.description}</td>
              <td>{new Date(festival.startDate).toLocaleDateString('fa-IR')}</td>
              <td>{new Date(festival.endDate).toLocaleDateString('fa-IR')}</td>
              <td>
                <button onClick={() => handleDelete(festival.id)} style={{ marginRight: '10px' }}>
                  حذف
                </button>
                <button onClick={() => router.push(`/admin/sales-festivals/edit/${festival.id}`)}>
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

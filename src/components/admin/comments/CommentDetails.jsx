'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCommentStatus, addAdminReply, deleteComment } from '@/actions/admin/comments'
import toast from 'react-hot-toast'
import moment from 'moment-jalaali' // وارد کردن moment-jalaali

export default function CommentDetails({ comment, user }) {
  const router = useRouter()
  const [reply, setReply] = useState('')
  const [statusChanged, setStatusChanged] = useState(comment.isApproved !== null) // وضعیت کامنت

  // تابع تبدیل تاریخ میلادی به شمسی با استفاده از moment-jalaali
  const convertToJalali = (date) => {
    return moment(date).format('jYYYY/jMM/jDD') // تبدیل به تاریخ شمسی
  }

  const handleApproval = async (status) => {
    try {
      await updateCommentStatus(comment.id, status)
      toast.success(status ? 'نظر تایید شد' : 'نظر رد شد')
      setStatusChanged(true) // تغییر وضعیت
      router.push('/admin/comments') // بازگشت به صفحه مدیریت نظرات
      router.refresh()
    } catch (error) {
      toast.error('خطا در تغییر وضعیت نظر')
    }
  }

  const handleReply = async () => {
    if (!reply.trim()) {
      toast.error('پاسخ نمی‌تواند خالی باشد.')
      return
    }

    try {
      await addAdminReply(comment.id, user.id, reply)
      toast.success('پاسخ ثبت شد')
      router.push('/admin/comments') // بازگشت به صفحه مدیریت نظرات
      router.refresh()
    } catch (error) {
      toast.error('خطا در ثبت پاسخ')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id)
      toast.success('نظر با موفقیت حذف شد')
      router.push('/admin/comments') // بازگشت به صفحه مدیریت نظرات
    } catch (error) {
      toast.error('خطا در حذف نظر')
    }
  }

  return (
    <div className={`formContainer`}>
      <p className={`formLabel`}>
        نام کاربر: <span>{comment.user.name || 'ناشناس'}</span>
      </p>
      <p className={`formLabel`}>
        نظر: <span>{comment.content}</span>
      </p>
      <p className={`formLabel`}>
        تاریخ ثبت: <span>{convertToJalali(comment.createdAt)}</span>{' '}
        {/* استفاده از تابع convertToJalali */}
      </p>

      {/* فرم پاسخ ادمین */}
      <label className={`formLabel`}>
        پاسخ:
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="پاسخ ادمین"
          className={`formInputArea`}
        />
      </label>
      <button onClick={handleReply} className={`formButton`}>
        ارسال پاسخ
      </button>
      {/* نمایش دکمه‌های تایید و رد فقط در صورتی که وضعیت تغییر نکرده باشد */}
      {!statusChanged && (
        <div className={`buttonGroup`}>
          <button onClick={() => handleApproval(true)} className={`formButton`}>
            تایید
          </button>
          <button onClick={() => handleApproval(false)} className={`formButton`}>
            رد
          </button>
        </div>
      )}
      {/* نمایش دکمه حذف در صورتی که وضعیت تغییر کرده باشد */}
      {statusChanged && (
        <div className={`buttonGroup`}>
          <button onClick={handleDelete} className={`formButton deleteButton`}>
            حذف نظر
          </button>
        </div>
      )}
    </div>
  )
}

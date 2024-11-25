'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCommentStatus, addAdminReply, deleteComment } from '@/actions/admin/comments'
import toast from 'react-hot-toast'

export default function CommentDetails({ comment, user }) {
  const router = useRouter()
  const [reply, setReply] = useState('')
  const [statusChanged, setStatusChanged] = useState(comment.isApproved !== null) // وضعیت کامنت

  const handleApproval = async (status) => {
    try {
      await updateCommentStatus(comment.id, status)
      toast.success(status ? 'نظر تایید شد' : 'نظر رد شد')
      setStatusChanged(true) // تغییر وضعیت
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
    <div>
      <h1>جزئیات نظر</h1>
      <p>نام کاربر: {comment.user.name || 'ناشناس'}</p>
      <p>نظر: {comment.content}</p>
      <p>تاریخ ثبت: {new Date(comment.createdAt).toLocaleDateString()}</p>

      {/* نمایش دکمه‌های تایید و رد فقط در صورتی که وضعیت تغییر نکرده باشد */}
      {!statusChanged && (
        <div>
          <button onClick={() => handleApproval(true)}>تایید</button>
          <button onClick={() => handleApproval(false)}>رد</button>
        </div>
      )}

      {/* نمایش دکمه حذف در صورتی که وضعیت تغییر کرده باشد */}
      {statusChanged && (
        <div>
          <button onClick={handleDelete}>حذف نظر</button>
        </div>
      )}

      {/* فرم پاسخ ادمین */}
      <div>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="پاسخ ادمین"
        />
        <button onClick={handleReply}>ارسال پاسخ</button>
      </div>
    </div>
  )
}

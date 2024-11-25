'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCommentStatus, addAdminReply } from '@/actions/admin/comments'
import toast from 'react-hot-toast'

export default function CommentDetails({ comment, user }) {
  const router = useRouter()
  const [reply, setReply] = useState('')

  const handleApproval = async (status) => {
    try {
      await updateCommentStatus(comment.id, status)
      toast.success(status ? 'نظر تایید شد' : 'نظر رد شد')
      router.push('/admin/comments')
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

  return (
    <div>
      <h1>جزئیات نظر</h1>
      <p>نام کاربر: {comment.user.name || 'ناشناس'}</p>
      <p>نظر: {comment.content}</p>
      <p>تاریخ ثبت: {new Date(comment.createdAt).toLocaleDateString()}</p>

      <div>
        <button onClick={() => handleApproval(true)}>تایید</button>
        <button onClick={() => handleApproval(false)}>رد</button>
      </div>

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

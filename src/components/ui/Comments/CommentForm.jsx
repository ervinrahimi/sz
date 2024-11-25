'use client'

import { useState } from 'react'
import { addComment } from '@/actions/admin/comments'
import toast from 'react-hot-toast'

export default function CommentForm({ pageId, userId }) {
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('نظر نمی‌تواند خالی باشد.')
      return
    }

    try {
      await addComment({ content, userId, pageId }) // ارسال نظر به سرور
      toast.success('نظر شما ثبت شد و در انتظار تایید است.')
      setContent('') // پاک کردن ورودی پس از ثبت
    } catch (error) {
      toast.error('خطا در ثبت نظر.')
    }
  }

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="نظر خود را بنویسید"
      />
      <button onClick={handleSubmit}>ارسال نظر</button>
    </div>
  )
}

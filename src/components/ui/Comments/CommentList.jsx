'use client'

import { useEffect, useState } from 'react'
import { getCommentsByPage } from '@/actions/admin/comments'

export default function CommentList({ pageId }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPage(pageId)
        setComments(data)
      } catch (error) {
        console.error('خطا در دریافت نظرات:', error)
      }
    }
    fetchComments()
  }, [pageId])

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}
          >
            {/* نام کاربر */}
            <p>
              <strong>کاربر:</strong> {comment.user?.name || 'ناشناس'}
            </p>
            {/* متن نظر */}
            <p>
              <strong>نظر:</strong> {comment.content}
            </p>
            {/* پاسخ ادمین */}
            {comment.adminReply && (
              <p style={{ fontStyle: 'italic', color: 'gray' }}>
                <strong>پاسخ ادمین:</strong> {comment.adminReply.content}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>هنوز نظری ثبت نشده است.</p>
      )}
    </div>
  )
}

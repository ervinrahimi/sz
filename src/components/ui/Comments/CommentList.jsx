'use client'

import { useEffect, useState } from 'react'
import { getCommentsByPage } from '@/actions/admin/comments'
import styles from './CommentList.module.css'

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
    <div className={styles.commentListBox}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={styles.commentlist}>
            <div  className={styles.userComment}>
            {/* نام کاربر */}
            <p>
              <strong>کاربر:</strong> {comment.user?.name || 'ناشناس'}
            </p>
            {/* متن نظر */}
            <p>
              <strong>نظر:</strong> {comment.content}
            </p>
            </div>
            {/* پاسخ ادمین */}
            {comment.adminReply && (
              <p className={styles.adminReply}>
                <strong>پاسخ ادمین:</strong> {comment.adminReply.content}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className={styles.noComment}>هنوز نظری ثبت نشده است</p>
      )}
    </div>
  )
}

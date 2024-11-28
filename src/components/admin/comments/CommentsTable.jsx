// src/components/admin/comments/CommentsTable.jsx

'use client'

import styles from './CommentsTable.module.css'
import Link from 'next/link'

export default function CommentsTable({ comments }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>نام کاربری</div>
        <div className={styles.headerCell}>نظر</div>
        <div className={styles.headerCell}>تاریخ</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {comments.map(comment => (
          <div key={comment.id} className={styles.row}>
            <div className={styles.cell}>{comment.user.name || 'ناشناس'}</div>
            <div className={styles.cell}>
              {comment.content.length > 10 
                ? `${comment.content.slice(0, 10)}...` 
                : comment.content}
            </div>
            <div className={styles.cell}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/comments/${comment.id}`}>
                <button className={styles.button}>جزئیات</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

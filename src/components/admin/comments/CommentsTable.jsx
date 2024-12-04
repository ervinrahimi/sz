'use client'

import styles from './CommentsTable.module.css'
import Link from 'next/link'
import moment from 'moment-jalaali' // وارد کردن moment-jalaali

export default function CommentsTable({ comments }) {
  // تابع تبدیل تاریخ میلادی به شمسی با استفاده از moment-jalaali
  const convertToJalali = (date) => {
    return moment(date).format('jYYYY/jMM/jDD') // تبدیل به تاریخ شمسی
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>نام کاربری</div>
        <div className={styles.headerCell}>نظر</div>
        <div className={styles.headerCell}>تاریخ</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.row}>
            <div className={styles.cell}>{comment.user.name || 'ناشناس'}</div>
            <div className={styles.cell}>
              {comment.content.length > 10 ? `${comment.content.slice(0, 10)}...` : comment.content}
            </div>
            <div className={styles.cell}>
              {/* استفاده از تابع convertToJalali برای تبدیل تاریخ */}
              {convertToJalali(comment.createdAt)}
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

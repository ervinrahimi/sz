// src/components/admin/users/UsersTable.jsx

'use client'

import Link from 'next/link'
import styles from './UsersTable.module.css'

export default function UsersTable({ users }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>نام</div>
        <div className={styles.headerCell}>نام خانوادگی</div>
        <div className={styles.headerCell}>کد ملی</div>
        <div className={styles.headerCell}>ایمیل</div>
        <div className={styles.headerCell}>شماره تماس</div>
        <div className={styles.headerCell}>نقش</div>
        <div className={styles.headerCell}>تاریخ ایجاد</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {users.map((user) => (
          <div key={user.id} className={styles.row}>
            <div className={styles.cell}>{user.name}</div>
            <div className={styles.cell}>{user.family}</div>
            <div className={styles.cell}>{user.nationalCode}</div>
            <div className={styles.cell}>{user.email}</div>
            <div className={styles.cell}>{user.phone}</div>
            <div className={styles.cell}>
              {user.role === 1 ? 'ادمین' : 'کاربر'}
            </div>
            <div className={styles.cell}>
              {new Date(user.createdAt).toLocaleDateString('fa-IR')}
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/users/${user.id}`}>
                <button className={styles.button}>مشاهده</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

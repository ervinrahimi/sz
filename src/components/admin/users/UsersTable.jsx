// src/components/admin/users/UsersTable.jsx

'use client'

import Link from 'next/link'
import styles from './UsersTable.module.css'

export default function UsersTable({ users }) {
  return (
    <div className={styles.usersTable}>
      <Link href="/admin/users/create">
        <button className={styles.createUserButton}>ایجاد کاربر جدید</button>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>ایمیل</th>
            <th>شماره تماس</th>
            <th>نقش</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.family}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role === 1 ? 'ادمین' : 'کاربر'}</td>
              <td>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
              <td>
                <Link href={`/admin/users/${user.id}`} className={styles.actionLink}>مشاهده</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import styles from '../../page.module.css'
import MenuForm from '@/components/admin/menu/MenuForm'
import React from 'react'

export default function MenuCreatePage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ایجاد منو جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <MenuForm />
        </div>
      </div>
    </div>
  )
}

import styles from '../../../page.module.css'
import prisma from '@/db/client'
import Link from 'next/link'

export default async function CardBoxSectionsPage() {

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت مقاله</h1>
        </div>
        <div className={styles.balanceBox}>
          مدیریت مقاله
        </div>
      </div>
    </div>
  )
}

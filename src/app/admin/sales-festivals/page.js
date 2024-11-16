// src/app/admin/sales-festivals/page.jsx

import { getSalesFestivals } from '@/actions/admin/salesFestivals'
import SalesFestivalsList from '@/components/admin/salesFestivals/SalesFestivalList'
import Link from 'next/link'
import styles from '../page.module.css'

export default async function SalesFestivalsPage() {
  const festivals = await getSalesFestivals()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت جشنواره‌ها</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/sales-festivals/create'} className={styles.button}>
              ایجاد جشنواره‌ جدید
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <SalesFestivalsList festivals={festivals} />
        </div>
      </div>
    </div>
  )
}

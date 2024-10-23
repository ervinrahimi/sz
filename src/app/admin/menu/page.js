import { getMenuItems } from '@/actions/admin/menu'
import MenuTable from '@/components/admin/menu/MenuTable'
import styles from '../page.module.css'
import Link from 'next/link'

export default async function MenuPage() {
  const menuItems = await getMenuItems()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت منوها</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/menu/create'} className={styles.button}>
              ایجاد منو جدید
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <MenuTable menuItems={menuItems} />
        </div>
      </div>
    </div>
  )
}

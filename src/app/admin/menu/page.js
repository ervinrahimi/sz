import { getMenuItems } from '@/actions/admin/menu'
import MenuForm from '@/components/admin/menu/MenuForm'
import MenuTable from '@/components/admin/menu/MenuTable'
import styles from '../page.module.css'

export default async function MenuPage() {
  const menuItems = await getMenuItems()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت منوها</h1>
        </div>
        <div className={styles.balanceBox}>
          <MenuForm />
          <MenuTable menuItems={menuItems} />
        </div>
      </div>
    </div>
  )
}

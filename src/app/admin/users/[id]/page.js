// src/app/admin/users/[id]/page.jsx

import prisma from '@/db/client'
import UserDetails from '@/components/admin/users/UserDetails'
import styles from '../../page.module.css'

export default async function UserDetailsPage({ params }) {
  const userId = params.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: true,
      // سایر روابط
    },
  })

  if (!user) {
    return <div>کاربر یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات کاربر</h1>
        </div>
        <div className={styles.balanceBox}>
          <UserDetails user={user} />
        </div>
      </div>
    </div>
  )
}

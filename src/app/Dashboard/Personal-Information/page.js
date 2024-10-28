// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from '../page.module.css'
import PersonalInformation from '@/components/dashboard/PersonalInformation/PersonalInformation'
import prisma from '@/db/client'

export default async function Dashboard() {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>اطلاعات و ویرایش آن</h1>
          {/* <div className={styles.buttons}>
              <Link href={'/'} className={styles.button}>ایجاد</Link>
            </div> */}
        </div>
        <div className={styles.balanceBox}>
          <PersonalInformation user={user} />
        </div>
      </div>
    </div>
  )
}

import SalesConditionEditForm from '@/components/admin/sales-conditions/SalesConditionEditForm'
import styles from '../../../page.module.css'
import prisma from '@/db/client'
import Link from 'next/link'
import SalesConditionUserManager from '@/components/admin/sales-conditions/SalesConditionUserManager'
import { userAgent } from 'next/server'

export default async function SalesConditionManageUserPage({ params }) {
  const conditionId = params.id
  const salesCondition = await prisma.salesCondition.findUnique({
    where: { id: conditionId },
    include: {
      authorizedUsers: true,
    },
  })

  if (!salesCondition) return <div>شرایط فروش یافت نشد</div>

  if (!salesCondition.isLocked)
    return <div>شرایط فروش هنوز قفل نشده و برای همه کاربران در دسترس است!</div>

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت کاربران مجاز</h1>
          {salesCondition.isLocked && (
            <div className={styles.buttons}>
              <Link href={`/admin/sales-conditions/${salesCondition.id}`} className={styles.button}>
                مدیریت شرایط فروش
              </Link>
            </div>
          )}
        </div>
        <div className={styles.balanceBox}>
          <SalesConditionUserManager
            salesConditionId={salesCondition.id}
            initialUsers={salesCondition.authorizedUsers}
          />
        </div>
      </div>
    </div>
  )
}

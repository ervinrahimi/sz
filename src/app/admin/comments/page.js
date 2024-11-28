import CommentsTable from '@/components/admin/comments/CommentsTable'
import { getComments } from '@/actions/admin/comments'
import styles from '../page.module.css'

export default async function CommentsPage() {
  const comments = await getComments() // دریافت لیست کامنت‌ها

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت کامنت‌ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <CommentsTable comments={comments} />
        </div>
      </div>
    </div>
  )
}

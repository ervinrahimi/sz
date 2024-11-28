import CommentDetails from '@/components/admin/comments/CommentDetails'
import { getCommentById } from '@/actions/admin/comments'
import { auth } from '@/security/auth'
import styles from '../../page.module.css'

export default async function DocumentDetailsPage({ params }) {
  const comment = await getCommentById(params.id) // دریافت اطلاعات کامنت
  const session = await auth()

  if (!comment) {
    return <div>کامنت یافت نشد!</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات کامنت</h1>
        </div>
        <div className={styles.balanceBox}>
          <CommentDetails comment={comment} user={session?.user}/>
        </div>
      </div>
    </div>
  )
}

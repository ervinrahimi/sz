import ArticleCreateForm from '@/components/admin/blog/article-create-form/ArticleCreateForm'
import styles from '../../../page.module.css'
import prisma from '@/db/client'
import Link from 'next/link'

export default async function ArticleCreatePage() {

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ایجاد مقاله جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <ArticleCreateForm />
        </div>
      </div>
    </div>
  )
}

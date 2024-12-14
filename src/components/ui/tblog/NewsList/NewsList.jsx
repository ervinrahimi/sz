import { posts } from '../data/posts'
import NewsItem from '../NewsItem/NewsItem'
import styles from './NewsList.module.css'
import Link from 'next/link'

export default function NewsList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>پست‌های الی</h2>
        <Link href="/blog" className={styles.viewAll}>
          مشاهده همه
          <svg
            className={styles.arrow}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
      </div>
      <div className={styles.list}>
        {posts.slice(0, 3).map((post) => (
          <NewsItem key={post.id} item={post} />
        ))}
      </div>
    </div>
  )
}

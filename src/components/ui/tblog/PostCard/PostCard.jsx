import styles from './PostCard.module.css'
import Link from 'next/link'

export default function PostCard({ post }) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={post.image} alt={post.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.description}>{post.description.slice(0, 75)} ...</p>
          <div className={styles.author}>
            <img src={post.author.avatar} alt={post.author.name} className={styles.avatar} />
            <div className={styles.authorInfo}>
              <span className={styles.name}>{post.author.name}</span>
              <span className={styles.date}>{post.author.date}</span>
            </div>
            <Link href={`/blog/${post.slug}`} className={styles.actionButton}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

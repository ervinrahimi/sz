import styles from './NewsItem.module.css'
import Link from 'next/link'

export default function NewsItem({ item }) {
  return (
    <Link href={`/blog/${item.slug}`} className={styles.newsItem}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <div className={styles.content}>
        <span className={styles.category}>مقاله</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.subtitle}>{item.description}</p>
        <div className={styles.meta}>
          <div className={styles.dateTime}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {item.date}
          </div>
          <div className={styles.dateTime}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {item.name}
          </div>
        </div>
      </div>
    </Link>
  )
}

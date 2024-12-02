import Image from 'next/image'
import styles from './ArticleDetails.module.css'
import CommentForm from '../../Comments/CommentForm'
import CommentList from '../../Comments/CommentList'

export default function ArticleDetail({ user }) {
  const article = {
    title: 'چگونه دوچرخه مناسب برای بهار انتخاب کنیم؟',
    coverImage:
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bb9708132201083.61a4bd29db497.jpg',
    content:
      'این مقاله به شما کمک می‌کند تا بهترین دوچرخه را برای فصل بهار انتخاب کنید. انتخاب دوچرخه مناسب با توجه به شرایط آب‌وهوایی، نوع جاده و نیازهای شخصی شما از اهمیت بالایی برخوردار است...',
    author: {
      name: 'سباستین',
      avatar:
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bb9708132201083.61a4bd29db497.jpg',
      bio: 'نویسنده و علاقه‌مند به دوچرخه‌سواری.',
    },
    categories: ['ورزش', 'تفریح'],
    tags: ['دوچرخه', 'ورزش', 'بهار'],
    publishedAt: '1402/09/10',
  }

  const comments = [
    {
      user: 'علی رضایی',
      content: 'مقاله بسیار مفیدی بود. ممنون از نویسنده!',
      createdAt: '1402/09/11',
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.meta}>
          <span>نویسنده: {article.author.name}</span>
          <span>تاریخ انتشار: {article.publishedAt}</span>
        </div>
      </div>
      <div className={styles.coverImage}>
        <Image
          src={article.coverImage}
          alt={article.title}
          layout="responsive"
          width={700}
          height={400}
        />
      </div>
      <div className={styles.content}>
        <p>{article.content}</p>
      </div>
      <div className={styles.categories}>
        <strong>دسته‌بندی‌ها:</strong>{' '}
        {article.categories.map((category, index) => (
          <span key={index} className={styles.category}>
            {category}
          </span>
        ))}
      </div>
      <div className={styles.tags}>
        <strong>برچسب‌ها:</strong>{' '}
        {article.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.authorSection}>
        <Image
          src={article.author.avatar}
          alt={article.author.name}
          width={80}
          height={80}
          className={styles.authorAvatar}
        />
        <div>
          <h3>{article.author.name}</h3>
          <p>{article.author.bio}</p>
        </div>
      </div>
      <div className={styles.commentsSection}>
        <div className={styles.titleContainer}>
          <h3>نظرات کاربران</h3>
        </div>
        {!user && (
          <div className={styles.userLockBox}>
            <div className={styles.userLock}>لطفا برای نظر دادن ابتدا لاگین کنید</div>
          </div>
        )}
        {user && (
          <div className={styles.commentForm}>
            <textarea placeholder="نظر خود را بنویسید" className={styles.textBox} />
            <button className={styles.submitButton}>ارسال نظر</button>
          </div>
        )}
        <div className={styles.commentListBox}>
          <div className={styles.commentlist}>
            <div className={styles.userComment}>
              {/* نام کاربر */}
              <p>
                <strong>کاربر:</strong> عرفان
              </p>
              {/* متن نظر */}
              <p>
                <strong>نظر:</strong> سلام
              </p>
            </div>
            {/* پاسخ ادمین */}
            <p className={styles.adminReply}>
              <strong>پاسخ ادمین:</strong> خدا نگه دار
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import BestBlog from '@/components/ui/tblog/BestBlog'
import BlogSlider from '@/components/ui/tblog/BlogSlider'
import styles from './page.module.css'
import PostSlider from '@/components/ui/tblog/PostSlider/PostSlider'
import NewsList from '@/components/ui/tblog/NewsList/NewsList'
import FeaturedSlider from '@/components/ui/tblog/FeaturedSlider/FeaturedSlider'
import { posts } from '@/components/ui/tblog/data/posts'

export default function BlogPage() {
  return (
    <main>
      <BlogSlider />
      <BestBlog />
      <div className={styles.container}>
        <h1 className={styles.title}>وبلاگ ما</h1>
        <p className={styles.description}>آخرین اخبار و بینش‌ها درباره خودروها را کشف کنید</p>
        <PostSlider posts={posts} />
        <div className={styles.newsSection}>
          <div className={styles.newsGrid}>
            <FeaturedSlider />
            <NewsList />
          </div>
        </div>
      </div>
    </main>
  )
}

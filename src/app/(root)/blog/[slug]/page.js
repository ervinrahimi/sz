import HeroSection from '@/components/ui/tblog/HeroSection'
import styles from './page.module.css'
import BlogLayout from '@/components/ui/tblog/BlogLayout'
import { posts } from '@/components/ui/tblog/data/posts'
import { notFound } from 'next/navigation'

export default function Page({ params }) {
  const { slug } = params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={styles.pageContainer}>
      <HeroSection />
      <BlogLayout>
        <article className={styles.blogPost}>
          {post.content.sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h3 className={styles.sectionHeading}>{section.heading}</h3>
              <div className={styles.sectionContent}>{section.content}</div>
            </div>
          ))}
        </article>
      </BlogLayout>
    </div>
  )
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

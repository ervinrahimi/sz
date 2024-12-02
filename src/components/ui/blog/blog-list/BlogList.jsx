import Image from 'next/image'
import Link from 'next/link'
import styles from './BlogList.module.css'
import bg from './Background.module.css'

const articles = [
  {
    id: 0,
    tag: 'جدیدترین',
    className: 'new',
    title: 'بررسی خودرو سوبا ام فور 2024',
    description: 'نقد و بررسی کامل از طراحی، عملکرد و قیمت خودرو سوبا ام فور.',
    author: 'سباستین',
    date: 'همین الان',
    image: '/blog/1.jpg',
  },
  {
    id: 1,
    tag: 'بررسی',
    className: 'review',
    title: 'خودروهای MG؛ انتخاب جدید بازار ایران',
    description: 'ویژگی‌ها و تفاوت‌های کلیدی بین مدل‌های مختلف MG.',
    author: 'الکساندر',
    date: 'دو روز پیش',
    image: '/blog/2.jpg',
  },
  {
    id: 2,
    tag: 'راهنما',
    className: 'guide',
    title: 'چگونه بهترین خودرو خانوادگی انتخاب کنیم؟',
    description: 'راهنمای کامل برای خرید خودرو مناسب خانواده.',
    author: 'لیزا',
    date: 'پنج روز پیش',
    image: '/blog/3.jpg',
  },
  {
    id: 3,
    tag: 'نکات',
    className: 'tips',
    title: 'نکات مهم برای خرید خودرو دست دوم',
    description: 'چگونه خودروی دست دوم با کیفیت بخریم.',
    author: 'جک',
    date: 'یک هفته پیش',
    image: '/blog/4.jpg',
  },
  {
    id: 4,
    tag: 'فناوری',
    className: 'tech',
    title: 'تاثیر تکنولوژی بر خودروهای امروزی',
    description: 'نقش هوش مصنوعی و تکنولوژی‌های نوین در خودروهای مدرن.',
    author: 'ماریا',
    date: 'دو هفته پیش',
    image: '/blog/5.jpg',
  },
  {
    id: 5,
    tag: 'تعمیرات',
    className: 'fixing',
    title: 'چگونه خودرو خود را برای زمستان آماده کنیم؟',
    description: 'نکاتی برای تعمیر و نگهداری خودرو در فصل سرما.',
    author: 'جان',
    date: 'سه هفته پیش',
    image: '/blog/6.jpg',
  },
  {
    id: 6,
    tag: 'فروشگاه',
    className: 'shop',
    title: 'بهترین نمایشگاه‌های خودرو در ایران',
    description: 'راهنمای خرید از معتبرترین نمایشگاه‌ها.',
    author: 'نیکول',
    date: 'یک ماه پیش',
    image: '/blog/7.jpg',
  },
]

export default function BlogList() {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>وبلاگ خودرویی</h1>
          <p className={styles.description}>مطالب ویژه و مفید در دنیای خودرو</p>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید..." className={styles.searchInput} />
            <button className={styles.searchButton}>جستجو</button>
          </div>
        </header>

        <main className={styles.main}>
          {/* Featured Article */}
          <Link href={`/blog/detail/${articles[0].id}`} passHref>
            <section className={styles.featured}>
              <div className={styles.featuredImage}>
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  layout="responsive"
                  width={700}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.label}>{articles[0].tag}</span>
                <h2 className={styles.featuredTitle}>{articles[0].title}</h2>
                <p className={styles.featuredDescription}>{articles[0].description}</p>
                <p className={styles.author}>
                  نویسنده: <span>{articles[0].author}</span> <span>{articles[0].date}</span>
                </p>
              </div>
            </section>
          </Link>

          {/* Articles in Boxes */}
          <section className={styles.articles}>
            {articles.slice(1).map((article, index) => (
              <Link href={`/blog/detail`} key={article.id} passHref>
                <article className={styles.article}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="responsive"
                    width={700}
                    height={400}
                    className={styles.image}
                  />
                  <div className={styles.articleContent}>
                    <span className={`${styles.label} ${styles[article.className]}`}>
                      {article.tag}
                    </span>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleDescription}>{article.description}</p>
                    <p className={styles.author}>
                      نویسنده: <span>{article.author}</span> <span>{article.date}</span>
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </>
  )
}

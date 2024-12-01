import Image from "next/image";
import Link from "next/link";
import styles from "./BlogList.module.css";

export default function BlogList() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          وبلاگ سلطانی زاده
        </h1>
        <p className={styles.description}>
          توضیح کوتاه یا شعار کوتاه به زودی قرار میگیرد...
        </p>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="جستجو کنید..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>جستجو</button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.featured}>
          <div className={styles.featuredImage}>
            <Image
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bb9708132201083.61a4bd29db497.jpg"
              alt="مقاله ویژه"
              layout="responsive"
              width={700}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.label}>جدیدترین</span>
            <h2 className={styles.featuredTitle}>
              چگونه دوچرخه مناسب برای بهار انتخاب کنیم؟
            </h2>
            <p className={styles.featuredDescription}>
              راهنمای کامل انتخاب بهترین دوچرخه برای خرید در فروشگاه‌ها...
            </p>
            <p className={styles.author}>
              نویسنده: <span>سباستین</span> <span>همین الان</span>
            </p>
          </div>
        </section>

        <section className={styles.articles}>
          {[
            { tag: "فروشگاه", className: "shop" },
            { tag: "نکات", className: "tips" },
            { tag: "تعمیرات", className: "fixing" },
          ].map((item, index) => (
            <article key={index} className={styles.article}>
              <Image
                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bb9708132201083.61a4bd29db497.jpg"
                alt={`مقاله ${index + 1}`}
                layout="responsive"
                width={700}
                height={400}
                className={styles.image}
              />
              <div className={styles.articleContent}>
                <span
                  className={`${styles.label} ${styles[item.className]}`}
                >
                  {item.tag}
                </span>
                <h3 className={styles.articleTitle}>
                  چگونه بهترین دوچرخه را برای بهار انتخاب کنیم؟
                </h3>
                <p className={styles.articleDescription}>
                  راهنمای خرید بهترین دوچرخه برای بهار...
                </p>
                <p className={styles.author}>
                  نویسنده: <span>سباستین</span> <span>همین الان</span>
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

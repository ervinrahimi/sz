import Image from 'next/image'
import styles from './ArticleDetails.module.css'

export default function ArticleDetail({ user }) {
  const article = {
    title: 'بررسی جامع خودرو سوبا ام فور 2024',
    coverImage: '/blog/1.jpg',
    content: `
      <h2>معرفی کلی خودرو</h2>
      <p>
        خودرو سوبا ام فور 2024 یکی از جدیدترین محصولات در صنعت خودروسازی است که با ویژگی‌های منحصربه‌فرد، توانسته جایگاه ویژه‌ای در بازار پیدا کند.
        این خودرو با طراحی مدرن، تکنولوژی پیشرفته و عملکرد بهینه، گزینه‌ای ایده‌آل برای علاقه‌مندان به خودروهای مدرن محسوب می‌شود.
      </p>
      <img src="/blog/detail/1.jpg" alt="تصویر معرفی سوبا ام فور" class="${styles.articleImage}" />

      <h2>طراحی خارجی</h2>
      <p>
        طراحی خارجی این خودرو از خطوط روان و زوایای تیز بهره می‌برد که ظاهری اسپرت و در عین حال لوکس به آن بخشیده است.
        چراغ‌های LED جدید، جلوپنجره بزرگ و رینگ‌های آلیاژی 18 اینچی از جمله ویژگی‌های برجسته طراحی بیرونی این خودرو هستند.
      </p>
      <ul class="${styles.featureList}">
        <li>چراغ‌های تمام LED با تکنولوژی هوشمند</li>
        <li>رنگ‌های متنوع و جذاب</li>
        <li>آیرودینامیک بهینه برای کاهش مصرف سوخت</li>
      </ul>
      <img src="/blog/detail/2.jpg" alt="طراحی خارجی سوبا ام فور" class="${styles.articleImage}" />

      <h2>طراحی داخلی</h2>
      <p>
        داخل خودرو سوبا ام فور به گونه‌ای طراحی شده که راحتی و لوکس بودن را همزمان ارائه دهد.
        استفاده از متریال با کیفیت بالا در داشبورد، صندلی‌ها و کف‌پوش، حس خوبی به سرنشینان منتقل می‌کند.
        صفحه‌نمایش لمسی بزرگ، سیستم صوتی پیشرفته و نورپردازی داخلی قابل تنظیم از دیگر ویژگی‌های قابل توجه هستند.
      </p>
      <img src="/blog/detail/3.jpg" alt="نمای داخلی سوبا ام فور" class="${styles.articleImage}" />

      <h2>مشخصات فنی</h2>
      <p>
        سوبا ام فور با دو نوع موتور قابل ارائه است: موتور بنزینی توربوشارژ و موتور هیبریدی.
        هر دو نوع موتور عملکرد بالایی دارند و بهینه‌سازی شده‌اند تا مصرف سوخت را کاهش دهند.
      </p>
      <table class="${styles.specTable}">
        <thead>
          <tr>
            <th>ویژگی</th>
            <th>مشخصات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>نوع موتور</td>
            <td>1.5 لیتری توربوشارژ</td>
          </tr>
          <tr>
            <td>حداکثر توان</td>
            <td>150 اسب بخار</td>
          </tr>
          <tr>
            <td>گیربکس</td>
            <td>6 سرعته خودکار</td>
          </tr>
          <tr>
            <td>مصرف سوخت</td>
            <td>6.5 لیتر در 100 کیلومتر</td>
          </tr>
        </tbody>
      </table>

      <h2>تجربه رانندگی</h2>
      <p>
        تجربه رانندگی با سوبا ام فور لذت‌بخش و بدون نقص است. سیستم تعلیق نرم، هندلینگ فوق‌العاده و عملکرد سریع موتور باعث می‌شود
        این خودرو برای مسافرت‌های طولانی و رانندگی روزانه ایده‌آل باشد.
      </p>
      <blockquote class="${styles.quote}">
        "این خودرو تجربه‌ای بی‌نظیر از رانندگی را ارائه می‌دهد که حتی برای سخت‌گیرترین رانندگان نیز رضایت‌بخش خواهد بود."
      </blockquote>

      <h2>قیمت و مقایسه</h2>
      <p>
        قیمت این خودرو در مقایسه با رقبا بسیار رقابتی است و با توجه به امکاناتی که ارائه می‌دهد، ارزش خرید بالایی دارد.
        در جدول زیر، مقایسه‌ای بین این خودرو و رقبا ارائه شده است:
      </p>
      <table class="${styles.compareTable}">
        <thead>
          <tr>
            <th>مدل</th>
            <th>قیمت</th>
            <th>مصرف سوخت</th>
            <th>توان موتور</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>سوبا ام فور</td>
            <td>1.2 میلیارد تومان</td>
            <td>6.5 لیتر</td>
            <td>150 اسب بخار</td>
          </tr>
          <tr>
            <td>رقیب A</td>
            <td>1.3 میلیارد تومان</td>
            <td>7.0 لیتر</td>
            <td>140 اسب بخار</td>
          </tr>
          <tr>
            <td>رقیب B</td>
            <td>1.1 میلیارد تومان</td>
            <td>6.8 لیتر</td>
            <td>135 اسب بخار</td>
          </tr>
        </tbody>
      </table>

      <h2>نتیجه‌گیری</h2>
      <p>
        سوبا ام فور 2024 با طراحی جذاب، امکانات پیشرفته و عملکرد بالا، یک گزینه بی‌نظیر برای خریداران خودروهای مدرن است.
        اگر به دنبال خودرویی هستید که ترکیبی از تکنولوژی، راحتی و ارزش را ارائه دهد، این مدل را از دست ندهید.
      </p>
      <div class="${styles.buttonContainer}">
        <a href="/contact" class="${styles.articleButton}">
          درخواست مشاوره خرید
        </a>
      </div>
    `,
    author: {
      name: 'سباستین',
      avatar:
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bb9708132201083.61a4bd29db497.jpg',
      bio: 'نویسنده‌ای با سال‌ها تجربه در زمینه بررسی خودرو و تحلیل بازار.',
    },
    categories: ['خودرو', 'نقد و بررسی'],
    tags: ['خودرو', 'سوبا ام فور', '2024'],
    publishedAt: '1402/09/10',
  }

  const comments = [
    {
      user: 'علی رضایی',
      content: 'مقاله بسیار جامع و مفیدی بود. با تشکر از نویسنده!',
      createdAt: '1402/09/11',
    },
    {
      user: 'مریم احمدی',
      content: 'اطلاعات ارائه شده بسیار کامل بود. لطفا مدل‌های دیگر را هم بررسی کنید.',
      createdAt: '1402/09/12',
    },
    {
      user: 'سجاد شریفی',
      content: 'به نظرم این خودرو نسبت به قیمتش امکانات خوبی داره.',
      createdAt: '1402/09/13',
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
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />
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
          {comments.map((comment, index) => (
            <div key={index} className={styles.commentlist}>
              <div className={styles.userComment}>
                <p>
                  <strong>کاربر:</strong> {comment.user}
                </p>
                <p>
                  <strong>نظر:</strong> {comment.content}
                </p>
                <p className={styles.commentDate}>{comment.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

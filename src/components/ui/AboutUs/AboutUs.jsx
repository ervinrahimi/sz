'use client'

import { useState } from 'react'
import styles from './AboutUs.module.css'
import Image from 'next/image'

export default function AboutUsPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.container}>
      {/* عنوان اصلی */}
      <h1 className={styles.title}>درباره ما</h1>

      {/* متن معرفی */}
      <p className={styles.intro}>
        ما یک تیم پیشرو در صنعت هستیم که با هدف ارائه بهترین خدمات و محصولات به مشتریان خود فعالیت
        می‌کنیم. مأموریت ما ایجاد تجربه‌ای بی‌نظیر برای شماست و چشم‌انداز ما تبدیل شدن به بهترین در
        این حوزه است.
      </p>

      {/* تصاویر مرتبط */}
      <div className={styles.imageSection}>
        <Image width={3000} height={2000} src="/about-us/team.jpg" alt="تیم ما" className={styles.image} />
        <Image width={3000} height={2000} src="/about-us/office.jpg" alt="دفتر کار" className={styles.image} />
      </div>

      {/* تاریخچه مختصر شرکت */}
      <section className={styles.history}>
        <h2 className={styles.sectionTitle}>تاریخچه ما</h2>
        <p className={styles.sectionContent}>
          شرکت ما در سال ۱۳۹۰ با هدف ارائه خدمات نوآورانه تأسیس شد. از آن زمان تاکنون، ما با
          تلاش‌های مستمر توانسته‌ایم اعتماد مشتریان خود را جلب کنیم و به یکی از پیشگامان این صنعت
          تبدیل شویم.
        </p>
      </section>

      {/* بخش ارزش‌ها */}
      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>ارزش‌های ما</h2>
        <ul className={styles.valueList}>
          <li>
          <Image width={500} height={500} src="/about-us/icons/medal-star.png" alt="تیم ما" className={styles.valueImage} />
          <p>تعهد به کیفیت</p>
          </li>
          <li>
          <Image width={500} height={500} src="/about-us/icons/24-support.png" alt="تیم ما" className={styles.valueImage} />
          <p>پشتیبانی ۲۴ ساعته</p>
          </li>
          <li>
          <Image width={500} height={500} src="/about-us/icons/star.png" alt="تیم ما" className={styles.valueImage} />
          <p>نوآوری و خلاقیت</p>
          </li>
          <li>
          <Image width={500} height={500} src="/about-us/icons/profile-2user.png" alt="تیم ما" className={styles.valueImage} />
          <p>همکاری تیمی</p>
          </li>
        </ul>
      </section>

      {/* کارت‌ها */}
      <div className={styles.cards}>
        {[
          {
            title: 'تماس با فروش',
            description: 'صحبت با تیم فروش',
            linkText: 'sales@soltanzade.com',
            link: '',
          },
          {
            title: 'پشتیبانی',
            description: 'ما اینجا هستیم تا کمک کنیم',
            linkText: 'support@soltanzade.com',
            link: '',
          },
          {
            title: 'بازدید از دفتر',
            description: 'دفتر اصلی ما',
            linkText: 'مشاهده در نقشه',
            link: '',
          },
          {
            title: 'تماس با ما',
            description: 'دوشنبه تا جمعه',
            linkText: '02191694314',
            link: '',
          },
        ].map((card, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardDescription}>{card.description}</p>
            <a href={card.link} className={styles.cardLink}>
              {card.linkText}
            </a>
          </div>
        ))}
      </div>

      {/* سوالات متداول */}
      <h2 className={styles.faqTitle}>سوالات متداول</h2>
      <div className={styles.faqs}>
        {[
          {
            question: 'آیا امکان استفاده رایگان وجود دارد؟',
            answer: 'بله، شما می‌توانید به مدت ۳۰ روز از خدمات ما به صورت رایگان استفاده کنید.',
          },
          {
            question: 'آیا می‌توانم پلن خود را تغییر دهم؟',
            answer: 'بله، شما می‌توانید هر زمان پلن خود را ارتقا یا کاهش دهید.',
          },
          {
            question: 'سیاست لغو اشتراک شما چیست؟',
            answer: 'شما می‌توانید در هر زمان اشتراک خود را بدون هیچ جریمه‌ای لغو کنید.',
          },
          {
            question: 'آیا می‌توان اطلاعات اضافی به فاکتور اضافه کرد؟',
            answer:
              'بله، شما می‌توانید یادداشت‌های سفارشی و اطلاعات اضافی را به فاکتور خود اضافه کنید.',
          },
          {
            question: 'چطور می‌توانم ایمیل حساب کاربری خود را تغییر دهم؟',
            answer: 'شما می‌توانید ایمیل خود را در تنظیمات حساب کاربری به‌روزرسانی کنید.',
          },
        ].map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
          >
            <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={styles.icon}>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
          </div>
        ))}
      </div>

      {/* دکمه‌های CTA */}
      <div className={styles.ctaButtons}>
        <button className={styles.ctaButton}>تماس با ما</button>
        <button className={styles.ctaButton}>عضویت</button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import styles from './Footer.module.css'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewsletterSubmit = async () => {
    if (!email) {
      toast.error('لطفاً ایمیل خود را وارد کنید!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('ایمیل با موفقیت ارسال شد!')
        setEmail('')
      } else {
        toast.error(result.error || 'خطا در ارسال ایمیل')
      }
    } catch (error) {
      toast.error('خطا در برقراری ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeader}>دسترسی سریع</h3>
            <ul>
              <li>
                <a href="/">صفحه اصلی</a>
              </li>
              <li>
                <a href="/about-us">درباره ما</a>
              </li>
              <li>
                <a href="contact-us">تماس با ما</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeader}>ارتباط با ما</h3>
            <ul>
              <li>
                <a href="#">شماره تماس : 02191694314</a>
              </li>
              <li>
                <a href="#" className={styles.highlight}>
                  آدرس : رسالت شمالی، روبروی داروخانه رسالت، برج ساعت
                </a>
              </li>
              <li>
                <a href="#">ایمیل : Info@Soltanzade.com</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeader}>نماد های الکترونیکی</h3>
            <ul>
              <li>
                <a href="#">اینماد</a>
              </li>
              <li>
                <a href="#">ساماندهی</a>
              </li>
              <li>
                <a href="#">زرین پال</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeader}>خبر نامه</h3>
            <p className={styles.newsletter}>
              برای اطلاع از اخبار های سایت گروه خودرو سلطان زاده از طریق فرم زیر از خبر ها مطلع شوید
            </p>
            <div className={styles.newsletter}>
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleNewsletterSubmit} disabled={loading}>
                {loading ? 'در حال ارسال...' : 'اشتراک'}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            <a href="#">حریم خصوصی</a> · <a href="#">خط مشی و شرایط سایت</a>
          </p>
          <div className={styles.socialLinks}>
            <span>تلگرام</span> ·<a href="https://www.instagram.com/fardakhodro/">اینستاگرام</a> ·
            <span>واتساپ</span> ·<span>یوتیوب</span>
          </div>
        </div>
      </footer>

      <div className={styles.ctaSection}>
        <p>تمامی حقوق این سایت متعلق به گروه خودرو سلطان زاده میباشد.</p>
      </div>
    </>
  )
}

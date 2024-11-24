'use client'
import styles from './Footer.module.css'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [toastCount, setToastCount] = useState(0)
  const [isToastLimited, setIsToastLimited] = useState(false)

  const handleToast = () => {
    if (!isToastLimited) {
      if (toastCount < 5) {
        toast('این شبکه اجتماعی هنوز در دسترس نیست!')
        setToastCount(toastCount + 1)
      }
      if (toastCount + 1 === 5) {
        setIsToastLimited(true)
        setTimeout(() => {
          setToastCount(0)
          setIsToastLimited(false)
        }, 2000) // بعد از ۱۰ ثانیه محدودیت برداشته می‌شود
      }
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
                <a href="#">صفحه اصلی</a>
              </li>
              <li>
                <a href="#">درباره ما</a>
              </li>
              <li>
                <a href="#">تماس با ما</a>
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
              <input type="email" placeholder="ایمیل خود را وارد کنید" />
              <button>اشتراک</button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            <a href="#">حریم خصوصی</a> · <a href="#">خط مشی و شرایط سایت</a>
          </p>
          <div className={styles.socialLinks}>
            <span onClick={handleToast}>تلگرام</span> ·
            <Link href="https://www.instagram.com/fardakhodro/">اینستاگرام</Link> ·
            <span onClick={handleToast}>واتساپ</span> ·<span onClick={handleToast}>یوتیوب</span>
          </div>
        </div>
      </footer>

      <div className={styles.ctaSection}>
        <p>تمامی حقوق این سایت متعلق به گروه خودرو سلطان زاده میباشد.</p>
        {/* <button>Upgrade my plan</button> */}
      </div>

      {/* <div>
        <p className={styles.copyright}>
          تمامی حقوق این سایت متعلق به گروه خودرو سلطان زاده میباشد.
        </p>
      </div> */}
    </>
  )
}

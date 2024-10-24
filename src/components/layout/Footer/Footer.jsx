// src/components/Footer.jsx
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
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
                <a href="#">شماره تماس : 999999</a>
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
            <Link href="#">تلگرام</Link> ·<Link href="https://www.instagram.com/fardakhodro/">اینستاگرام</Link> ·
            <Link href="#">واتساپ</Link> ·<Link href="#">یوتیوب</Link>
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

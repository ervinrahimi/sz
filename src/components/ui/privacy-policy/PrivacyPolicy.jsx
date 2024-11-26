// components/PrivacyPolicy.js
import styles from './PrivacyPolicy.module.css'

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPolicyContainer}>
      <h1 className={styles.title}>
        سیاست <span className={styles.highlight}>حریم خصوصی</span>
      </h1>
      <p className={styles.description}>
        ما در سایت خرید و فروش خودرو به حریم خصوصی شما اهمیت می‌دهیم. لطفاً این سیاست را مطالعه
        کنید.
      </p>

      <div className={styles.policyContent}>
        <aside className={styles.sidebar}>
          <ul>
            <li>
              <a href="#info-we-collect" className={styles.link}>
                اطلاعاتی که جمع‌آوری می‌کنیم
              </a>
            </li>
            <li>
              <a href="#use-of-info" className={styles.link}>
                نحوه استفاده از اطلاعات شما
              </a>
            </li>
            <li>
              <a href="#info-sharing" className={styles.link}>
                اشتراک‌گذاری اطلاعات
              </a>
            </li>
            <li>
              <a href="#data-security" className={styles.link}>
                امنیت اطلاعات
              </a>
            </li>
            <li>
              <a href="#user-rights" className={styles.link}>
                حقوق و انتخاب‌های شما
              </a>
            </li>
            <li>
              <a href="#children-privacy" className={styles.link}>
                حریم خصوصی کودکان
              </a>
            </li>
            <li>
              <a href="#policy-changes" className={styles.link}>
                تغییرات در سیاست
              </a>
            </li>
            <li>
              <a href="#contact-us" className={styles.link}>
                تماس با ما
              </a>
            </li>
          </ul>
        </aside>

        <main className={styles.mainContent}>
          <section id="info-we-collect">
            <h2>اطلاعاتی که ما جمع‌آوری می‌کنیم</h2>
            <p>ما اطلاعات شخصی، اطلاعات خودرو، و اطلاعات فنی دستگاه شما را جمع‌آوری می‌کنیم.</p>
          </section>
          <section id="use-of-info">
            <h2>نحوه استفاده از اطلاعات شما</h2>
            <p>
              اطلاعات شما برای انجام معاملات خودرو، شخصی‌سازی خدمات و بهبود عملکرد سایت استفاده
              می‌شود.
            </p>
          </section>
          <section id="info-sharing">
            <h2>اشتراک‌گذاری اطلاعات</h2>
            <p>اطلاعات شما تنها در صورت نیاز و با رضایت شما با دیگران به اشتراک گذاشته می‌شود.</p>
          </section>
          <section id="data-security">
            <h2>امنیت اطلاعات</h2>
            <p>ما از تکنولوژی‌های پیشرفته برای حفاظت از اطلاعات شما استفاده می‌کنیم.</p>
          </section>
          <section id="user-rights">
            <h2>حقوق و انتخاب‌های شما</h2>
            <p>
              شما می‌توانید اطلاعات خود را ویرایش یا حذف کنید و از دریافت پیام‌های تبلیغاتی انصراف
              دهید.
            </p>
          </section>
          <section id="children-privacy">
            <h2>حریم خصوصی کودکان</h2>
            <p>ما اطلاعات افراد زیر ۱۸ سال را جمع‌آوری نمی‌کنیم.</p>
          </section>
          <section id="policy-changes">
            <h2>تغییرات در سیاست حفظ حریم خصوصی</h2>
            <p>در صورت تغییرات در این سیاست، کاربران مطلع خواهند شد.</p>
          </section>
          <section id="contact-us">
            <h2>تماس با ما</h2>
            <p>برای سوالات بیشتر، از طریق ایمیل support@example.com با ما در ارتباط باشید.</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PrivacyPolicy

// components/TermsAndConditions.js
import styles from './TermsAndConditions.module.css'

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.title}>
        خط‌مشی و <span className={styles.highlight}>شرایط</span>
      </h1>
      <p className={styles.description}>
        لطفاً پیش از استفاده از خدمات وب‌سایت خرید و فروش خودرو، این شرایط و ضوابط را به دقت مطالعه
        کنید.
      </p>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <ul>
            <li>
              <a href="#terms-of-use" className={styles.link}>
                شرایط استفاده
              </a>
            </li>
            <li>
              <a href="#user-responsibilities" className={styles.link}>
                مسئولیت‌های کاربران
              </a>
            </li>
            <li>
              <a href="#payment-policy" className={styles.link}>
                سیاست‌های پرداخت
              </a>
            </li>
            <li>
              <a href="#refund-policy" className={styles.link}>
                سیاست بازگشت وجه
              </a>
            </li>
            <li>
              <a href="#liabilities" className={styles.link}>
                محدودیت مسئولیت‌ها
              </a>
            </li>
            <li>
              <a href="#changes-to-terms" className={styles.link}>
                تغییرات در شرایط
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
          <section id="terms-of-use">
            <h2>شرایط استفاده</h2>
            <p>
              استفاده از خدمات سایت به معنای پذیرش این شرایط است. کاربران باید از سایت تنها برای
              مقاصد قانونی و در چارچوب قوانین مربوط به خرید و فروش خودرو استفاده کنند.
            </p>
          </section>
          <section id="user-responsibilities">
            <h2>مسئولیت‌های کاربران</h2>
            <p>
              کاربران مسئول ارائه اطلاعات صحیح درباره خودروها و مشخصات خود هستند. هرگونه تخلف یا
              ارائه اطلاعات نادرست ممکن است به حذف حساب کاربری منجر شود.
            </p>
          </section>
          <section id="payment-policy">
            <h2>سیاست‌های پرداخت</h2>
            <p>
              پرداخت‌ها باید از طریق درگاه‌های امن سایت انجام شود. ما هیچگونه مسئولیتی در قبال
              تراکنش‌هایی که خارج از سیستم ما انجام شده است، نداریم.
            </p>
          </section>
          <section id="refund-policy">
            <h2>سیاست بازگشت وجه</h2>
            <p>
              در صورت بروز مشکل در خرید خودرو، درخواست بازگشت وجه تنها در صورتی پذیرفته می‌شود که
              موضوع به تیم پشتیبانی سایت گزارش شده و مورد تأیید قرار گیرد.
            </p>
          </section>
          <section id="liabilities">
            <h2>محدودیت مسئولیت‌ها</h2>
            <p>
              سایت تنها به عنوان واسطه‌ای برای ارتباط بین خریداران و فروشندگان عمل می‌کند و مسئولیتی
              در قبال مشکلات ناشی از معاملات ندارد.
            </p>
          </section>
          <section id="changes-to-terms">
            <h2>تغییرات در شرایط</h2>
            <p>
              این شرایط ممکن است در آینده تغییر کند. کاربران موظف هستند به‌صورت دوره‌ای این صفحه را
              مرور کنند.
            </p>
          </section>
          <section id="contact-us">
            <h2>تماس با ما</h2>
            <p>در صورت داشتن هرگونه سؤال، از طریق ایمیل support@example.com با ما در تماس باشید.</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default TermsAndConditions

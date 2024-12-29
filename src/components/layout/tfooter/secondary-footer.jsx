import styles from './secondary-footer.module.css'

export default function SecondaryFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="/Privacy-Policy" className={styles.link}>حریم خصوصی</a>
          <span className={styles.separator}>•</span>
          <a href="/Terms-And-Conditions" className={styles.link}>خط مشی سایت</a>
        </div>
        <div className={styles.copyright}>
          © {currentYear} سلطان زاده. تمامی حقوق محفوظ است
        </div>
      </div>
    </div>
  )
}


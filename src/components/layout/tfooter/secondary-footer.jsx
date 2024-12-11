import styles from './secondary-footer.module.css'

export default function SecondaryFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="/privacy" className={styles.link}>حریم خصوصی</a>
          <span className={styles.separator}>•</span>
          <a href="/terms" className={styles.link}>شرایط استفاده</a>
          <span className={styles.separator}>•</span>
          <a href="/warranty" className={styles.link}>شرایط گارانتی</a>
        </div>
        <div className={styles.copyright}>
          © {currentYear} سلطان زاده. تمامی حقوق محفوظ است
        </div>
      </div>
    </div>
  )
}


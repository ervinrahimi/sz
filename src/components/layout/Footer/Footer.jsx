// src/components/layout/Footer/Footer.jsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <h2>SZ</h2>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <h3>محصولات</h3>
            <ul>
              <li>
                <a href="#">T5</a>
              </li>
              <li>
                <a href="#">B511</a>
              </li>
              <li>
                <a href="#">SX5</a>
              </li>
              <li>
                <a href="#">SUBA M4</a>
              </li>
              <li>
                <a href="#">MG GT</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>دسترسی سریع</h3>
            <ul>
              <li>
                <a href="#">خانه</a>
              </li>
              <li>
                <a href="#">محصولات</a>
              </li>
              <li>
                <a href="#">درباره ما</a>
              </li>
              <li>
                <a href="#">تماس با ما</a>
              </li>
              <li>
                <a href="#">نماد های الکترونیکی</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Soltan Zadeh Inc. © 2024</p>
        {/* <ul className={styles.footerLegal}>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </ul> */}
        <div className={styles.footerSocial}>
          <a href="#" className={styles.socialIcon}>
            Instagram
          </a>
          <a href="#" className={styles.socialIcon}>
            Whatsapp
          </a>
        </div>
      </div>
    </footer>
  )
}

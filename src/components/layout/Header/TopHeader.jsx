import React from 'react'
import { RiInstagramLine, RiTelegramLine, RiWhatsappLine } from 'react-icons/ri'
import styles from './TopHeader.module.css'

export default function TopHeader () {
  const importantPages = [
    { name: 'تماس با ما', link: '/contact-us' },
    { name: 'خط مشی', link: '/Terms-And-Conditions' },
    { name: 'درباره ما', link: '/about-us' },
    { name: 'سیاست حریم خصوصی', link: '/Privacy-Policy' },
  ]
  const socialMedia = [
    { icon: RiInstagramLine, label: 'Instagram', color: '#E1306C' },
    { icon: RiTelegramLine, label: 'Telegram', color: '#0088cc' },
    { icon: RiWhatsappLine, label: 'WhatsApp', color: '#25D366' },
  ]

  return (
    <div className={styles.topHeader}>
      <div className={styles.content}>
        <div className={styles.importantPages}>
          {importantPages.map((page, index) => (
            <React.Fragment key={page.name}>
              {index > 0 && <span className={styles.pageSeparator}>|</span>}
              <a href={page.link} className={styles.pageLink}>
                {page.name}
              </a>
            </React.Fragment>
          ))}
        </div>
        <div className={styles.socialMedia}>
          {socialMedia.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={styles.socialIcon}
              style={{ '--hover-color': color }}
              aria-label={label}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
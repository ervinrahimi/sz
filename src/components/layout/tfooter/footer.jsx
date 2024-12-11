import styles from './footer.module.css'
import { Tooltip, TooltipProvider } from '@/components/layout/tfooter/ui/tooltip'
import { SoltanZadeLogoSVG } from '@/components/layout/tfooter/ui/soltan-zade-logo'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'گروه خودرویی سلطان زاده',
      links: [
        { name: 'خانه', href: '/' },
        { name: 'خودرو ها', href: '/cars' },
        { name: 'طرح های فروش', href: '/sales-plans' },
        { name: 'درباره ما', href: '/about-us' },
        { name: 'تماس با ما', href: '/contact-us' },
      ],
    },
    {
      title: 'خودرو های FMC',
      links: [
        { name: 'FMC B511', href: '/cars/67307e9a6a53b993440edc0b' },
        { name: 'FMC T5', href: '/cars/67307f996a53b993440edc20' },
        { name: 'FMC SX5', href: '/cars/67307f286a53b993440edc16' },
        { name: 'FMC SUBA M4', href: '/cars/6730801a6a53b993440edc2a' },
      ],
    },
    {
      title: 'خودروهای MG',
      links: [
        { name: 'MG GT', href: '/cars/6735015786b18cb72e715969' },
        { name: 'MG 4 EV', href: '/cars/6735033086b18cb72e71597c' },
        { name: 'MG 5', href: '/cars/6735002686b18cb72e715956' },
        { name: 'MG Cyberster', href: '#' },
      ],
    },
    {
      title: 'برندها',
      links: [
        { name: 'سلطان زاده', href: '/' },
        { name: 'فردا موتور', href: '#' },
        { name: 'جیلی', href: '#' },
        { name: 'ام جی', href: '#' },
        { name: 'اف ام سی', href: '#' },
      ],
    },
    {
      title: 'شعبه ها',
      links: [
        { name: 'رسالت', href: '/about-us' },
        { name: 'بزودی', href: '#' },
      ],
    },
  ]

  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.linksContainer}>
            {footerSections.map((section, index) => (
              <div key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.linkList}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className={styles.link}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.bottomBar}>
            <div className={styles.logo}>
              <SoltanZadeLogoSVG className="text-current" />
            </div>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.socialIcon} ${styles.youtube}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.telegram}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498.355.004.857-.106 1.045-.444l2.482-4.823c2.107 1.709 4.165 3.472 6.284 5.142.387.349.81.543 1.254.543.679 0 1.212-.44 1.511-.987.644-1.049 1.444-2.445 2.201-3.899.868-1.787 1.755-3.657 2.654-5.55 1.083-2.345.557-3.99 0-4.995-.261-.47-.575-.828-.917-1.089z" />
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.whatsapp}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

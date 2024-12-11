import { FiSettings, FiChevronRight } from 'react-icons/fi'
import styles from './Header.module.css'

interface HeaderProps {
  formTitle: string
  onSettingsClick: () => void
}

export default function Header({ formTitle, onSettingsClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.right}>
        <button className={styles.backButton}>
          <FiChevronRight size={20} />
        </button>
        <h1 className={styles.title}>{formTitle}</h1>
      </div>
      <div className={styles.left}>
        <button className={styles.previewButton}>پیش‌نمایش</button>
        <button className={styles.saveButton}>ذخیره</button>
        <button className={styles.settingsButton} onClick={onSettingsClick}>
          <FiSettings size={20} />
        </button>
      </div>
    </header>
  )
}


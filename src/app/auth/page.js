import LoginForm from '@/components/auth/forms/login-form/LoginForm'
import Providers from '@/components/auth/providers/Providers'
import styles from './page.module.css'
import Auth from '@/components/auth/auth/Auth'

export default async function AuthPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <Providers /> */}
        <Auth />
      </div>
    </div>
  )
}

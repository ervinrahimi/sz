import LoginForm from '@/components/auth/forms/login-form/LoginForm'
import Providers from '@/components/auth/providers/Providers'
import styles from './page.module.css'

export default async function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <Providers /> */}
        <LoginForm />
      </div>
    </div>
  )
}

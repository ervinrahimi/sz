import ForgotPasswordForm from '@/components/auth/forms/forgot-password-form/ForgotPasswordForm'
import styles from './page.module.css'

export default async function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <Providers /> */}
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
import RegisterForm from '@/components/auth/forms/register-form/RegisterForm'
import Providers from '@/components/auth/providers/Providers'
import styles from './page.module.css'

export default async function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <Providers /> */}
        <RegisterForm />
      </div>
    </div>
  )
}

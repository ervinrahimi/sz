import ResetPasswordForm from '@/components/auth/forms/reset-password-form/ResetPasswordForm'
import { hasExpiredToken, validateToken } from '@/security/token'
import styles from './page.module.css'

const Page = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default async function ResetPasswordPage({ searchParams }) {
  if (searchParams.token) {
    const existingToken = await validateToken(searchParams.token, 'pass_')

    if (!existingToken) return <Page>توکن اشتباه است!</Page>

    const hasExpired = await hasExpiredToken(existingToken)

    if (hasExpired) return <Page>توکن منقضی شده!</Page>

    return (
      <Page>
        <ResetPasswordForm token={searchParams.token} />
      </Page>
    )
  } else {
    return (
      <Page>
        <h1>توکنی وارد نشد!</h1>
      </Page>
    )
  }
}

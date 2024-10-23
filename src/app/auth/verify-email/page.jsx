import { emailVerify } from '@/actions/auth/email-verify'
import styles from './page.module.css'

const Page = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default async function verifyEmailPage({ searchParams }) {

  if (searchParams.token) {
    const data = await emailVerify(searchParams.token)

    if (!data.success) {
      return <Page>{data.error}</Page>
    }

    return (
      <Page>
        <h1>ایمیل شما با موفقیت تایید شد.</h1>
      </Page>
    )
  } else {
    return (
      <Page>
        <h1>توکن وارد نشده!</h1>
      </Page>
    )
  }
}

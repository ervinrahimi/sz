import { emailVerify } from '@/actions/auth/email-verify'

const Page = ({ children }) => {
  return (
    <main>
      {children}
    </main>
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
        <h1>Email is verified</h1>
      </Page>
    )
  } else {
    return (
      <Page>
        <h1>Missing token!</h1>
      </Page>
    )
  }
}

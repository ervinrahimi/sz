import ResetPasswordForm from '@/components/auth/forms/reset-password-form/ResetPasswordForm'
import { hasExpiredToken, validateToken } from '@/security/token'

const Page = ({ children }) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default async function ResetPasswordPage({ searchParams }) {
  if (searchParams.token) {
    
    const existingToken = await validateToken(searchParams.token, 'pass_')

    if (!existingToken) return <Page>Invalid token!</Page>
  
    const hasExpired = await hasExpiredToken(existingToken)
  
    if (hasExpired) return <Page>Token has expired!</Page>

    return (
      <Page>
        <ResetPasswordForm token={searchParams.token} />
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

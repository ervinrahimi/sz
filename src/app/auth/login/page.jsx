import LoginForm from '@/components/auth/forms/login-form/LoginForm'
import Providers from '@/components/auth/providers/Providers'

export default async function LoginPage() {
  return (
    <main>
      <Providers />
      <LoginForm />
    </main>
  )
}
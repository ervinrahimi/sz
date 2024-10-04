import RegisterForm from '@/components/auth/forms/register-form/RegisterForm'
import Providers from '@/components/auth/providers/Providers'

export default async function RegisterPage() {
  return (
    <main>
      <Providers />
      <RegisterForm />
    </main>
  )
}

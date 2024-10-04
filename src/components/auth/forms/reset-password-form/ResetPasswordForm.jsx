'use client'

import { resetPasswordSchema } from '@/security/zod/auth-schema'
import { FormError } from '@/components/forms/message/Message'
import { resetPassword } from '@/actions/auth/reset-password'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form' 
import { useState } from 'react'

export default function ResetPasswordForm({ token }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) })
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    setError('')

    return await resetPassword(data, token)
      .then((data) => {
        setError(data?.error)
        if (data?.success) return router.push(AUTH_ROUTES.LOGIN)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="password" placeholder="Password" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <FormError message={error} />
      <button type="submit" disabled={isSubmitting}>
        Reset password
      </button>
    </form>
  )
}
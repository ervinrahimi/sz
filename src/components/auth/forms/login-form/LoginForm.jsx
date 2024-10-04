'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { loginSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { login } from '@/actions/auth/login'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  ? "Email already in use with different provider!"
  : "";

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await login(data, callbackUrl)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.success) {
          reset()
          setSuccess(data.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
          setSuccess('Verification code sent to email!')
        }
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {showTwoFactor && (
      <>
        <input disabled={isSubmitting} type="text" placeholder="Two Factor Code" {...register('code')} />
        {errors.code && <p>{errors.code.message}</p>}
      </>
    )}
    {!showTwoFactor && (
      <>
        <input disabled={isSubmitting} type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
        <input disabled={isSubmitting} type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </>
    )}
    <FormError message={error || urlError} />
    <FormSuccess message={success} />
    <button type="submit" disabled={isSubmitting}>
      {showTwoFactor ? 'Confirm' : 'Login'}
    </button>
  </form>
  )
}
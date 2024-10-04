'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { register as registerUser } from '@/actions/auth/register'
import { resgisterSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resgisterSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    await registerUser(data)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input disabled={isSubmitting} type="text" placeholder="Email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input disabled={isSubmitting} type="password" placeholder="Password (8+ characters)" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
      <FormError message={error} />
      <FormSuccess message={success} />
      <button type="submit" disabled={isSubmitting}>
        Register
      </button>
  </form>
  )
}
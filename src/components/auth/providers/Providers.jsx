'use client'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Providers() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const signInWithProvider = (type) => {
    signIn(type, {
      callbackUrl: callbackUrl || '/',
    })
  }

  return (
    <div>
      <button onClick={() => signInWithProvider('google')}>
        Google
      </button>
    </div>
  )
}
